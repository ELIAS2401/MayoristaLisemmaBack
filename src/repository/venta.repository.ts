import { prisma } from "../prisma.js";
export class VentaRepository {

    async obtenerVentas() {
        return prisma.venta.findMany({
            orderBy: { fecha: 'desc' },
            include: {
                cliente: true,
                usuario: true,
                notaCredito: true,
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }

    async crearVentaConDetalleYStock(data: {
        clienteId?: number;
        usuarioId: number;
        total: number;
        notaCreditoId?: number;
        montoNotaUsado?: number;
        detalles: {
            productoId: number;
            cantidad: number;
            precioUnitario: number;
        }[];
    }) {

        return prisma.$transaction(async (tx) => {

            // 1️⃣ Validar stock
            for (const d of data.detalles) {
                const producto = await tx.producto.findUnique({
                    where: { id: d.productoId }
                });

                if (!producto) {
                    throw new Error("Producto no encontrado");
                }

                if ((producto.stock ?? 0) < d.cantidad) {
                    throw new Error(`Stock insuficiente para ${producto.nombre}`);
                }
            }

            // 2️⃣ Crear venta
            const venta = await tx.venta.create({
                data: {
                    clienteId: data.clienteId,
                    usuarioId: data.usuarioId,
                    total: data.total,
                    notaCreditoId: data.notaCreditoId,
                    montoNotaUsado: data.montoNotaUsado,
                    detalles: {
                        create: data.detalles.map(d => ({
                            productoId: d.productoId,
                            cantidad: d.cantidad,
                            precioUnitario: d.precioUnitario
                        }))
                    }
                }
            });
            // 3️⃣ Descontar stock
            for (const d of data.detalles) {
                await tx.producto.update({
                    where: { id: d.productoId },
                    data: {
                        stock: {
                            decrement: d.cantidad
                        }
                    }
                });
            }
            if (data.notaCreditoId && data.montoNotaUsado && data.montoNotaUsado > 0) {

                const nc = await tx.nota_credito.findUnique({
                    where: { id: data.notaCreditoId }
                });

                if (!nc) {
                    throw new Error('Nota de crédito inexistente');
                }

                const disponible = Number(nc.total) - Number(nc.montoUsado);

                if (data.montoNotaUsado > disponible) {
                    throw new Error(`Saldo de nota insuficiente. Disponible: ${disponible}`);
                }

                const nuevoMontoUsado =
                    Number(nc.montoUsado) + Number(data.montoNotaUsado);

                let nuevoEstado: 'DISPONIBLE' | 'PARCIAL' | 'USADA' = 'PARCIAL';

                if (nuevoMontoUsado >= Number(nc.total)) {
                    nuevoEstado = 'USADA';
                }

                await tx.nota_credito.update({
                    where: { id: nc.id },
                    data: {
                        montoUsado: nuevoMontoUsado,
                        estado: nuevoEstado
                    }
                });
            }


            return venta;
        });
    }

    async anularVenta(ventaId: number) {

        const venta = await prisma.venta.findUnique({
            where: { id: ventaId },
            include: {
                detalles: true,
                notaCredito: true
            }
        });

        if (!venta || venta.estado === 'ANULADA') {
            throw new Error('Venta inválida');
        }

        if (venta.notaCreditoId && venta.montoNotaUsado && venta.notaCredito) {

            const nc = venta.notaCredito;

            const nuevoMontoUsado =
                Number(nc.montoUsado) - Number(venta.montoNotaUsado);


            let nuevoEstado: 'DISPONIBLE' | 'PARCIAL' | 'USADA' = 'PARCIAL';

            if (nuevoMontoUsado <= 0) nuevoEstado = 'DISPONIBLE';
            else if (nuevoMontoUsado >= Number(nc.total)) nuevoEstado = 'USADA';
            await prisma.nota_credito.update({
                where: { id: nc.id },
                data: {
                    montoUsado: nuevoMontoUsado,
                    estado: nuevoEstado
                }
            });
        }

        // 🔁 restaurar stock
        for (const detalle of venta.detalles) {
            await prisma.producto.update({
                where: { id: detalle.productoId },
                data: {
                    stock: { increment: detalle.cantidad }
                }
            });
        }

        // marcar venta como anulada
        return prisma.venta.update({
            where: { id: ventaId },
            data: {
                estado: 'ANULADA'
            }
        });
    }


}
