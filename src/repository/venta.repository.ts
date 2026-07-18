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

        if (!venta) {
            throw new Error('Venta inexistente');
        }

        if (venta.estado === 'ANULADA') {
            throw new Error('Venta inválida');
        }

        if (venta.detalles.some(d => d.cantidadAcreditada > 0)) {
            throw new Error('No se puede anular una venta con nota de crédito asociada');
        }

        if (venta.estado !== 'ACTIVA') {
            throw new Error('Solo se pueden anular ventas activas');
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
