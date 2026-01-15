import { prisma } from '../prisma.js';

export class NotaCreditoRepository {

    async crearNotaCredito(data: {
        usuarioId: number;
        clienteId: number;
        ventaId: number;
        items: {
            ventaDetalleId: number;
            cantidad: number;
        }[];
    }) {
        return prisma.$transaction(async (tx) => {

            // 1️⃣ Validaciones iniciales
            if (!data.items || data.items.length === 0) {
                throw new Error('La nota de crédito debe tener al menos un item');
            }

            const venta = await tx.venta.findUnique({
                where: { id: data.ventaId }
            });

            if (!venta) throw new Error('Venta inexistente');

            if (venta.estado === 'ACREDITADA') {
                throw new Error('La venta ya fue acreditada completamente');
            }

            let total = 0;
            const itemsNota = [];

            // 2️⃣ Procesar cada item
            for (const item of data.items) {

                const detalleVenta = await tx.detalleventa.findUnique({
                    where: { id: item.ventaDetalleId }
                });

                if (!detalleVenta) {
                    throw new Error('Detalle de venta inexistente');
                }

                if (detalleVenta.ventaId !== data.ventaId) {
                    throw new Error('El detalle no pertenece a la venta');
                }

                const disponible =
                    detalleVenta.cantidad - detalleVenta.cantidadAcreditada;

                if (item.cantidad <= 0) {
                    throw new Error('Cantidad inválida');
                }

                if (item.cantidad > disponible) {
                    throw new Error(
                        `Cantidad a acreditar supera lo disponible (${disponible})`
                    );
                }

                const precioUnitario = Number(detalleVenta.precioUnitario);

                total += item.cantidad * precioUnitario;

                itemsNota.push({
                    cantidad: item.cantidad,
                    precioUnitario,
                    ventaDetalleId: detalleVenta.id
                });
                // actualizar cantidad acreditada
                await tx.detalleventa.update({
                    where: { id: detalleVenta.id },
                    data: {
                        cantidadAcreditada: {
                            increment: item.cantidad
                        }
                    }
                });

                // devolver stock
                await tx.producto.update({
                    where: { id: detalleVenta.productoId },
                    data: {
                        stock: { increment: item.cantidad }
                    }
                });
            }

            // 3️⃣ Crear nota de crédito
            const nota = await tx.nota_credito.create({
                data: {
                    usuarioId: data.usuarioId,
                    clienteId: data.clienteId,
                    ventaId: data.ventaId,
                    total,
                    detalles: {
                        create: itemsNota.map(i => ({
                            cantidad: i.cantidad,
                            precioUnitario: i.precioUnitario,
                            ventaDetalle: {
                                connect: { id: i.ventaDetalleId }
                            }
                        }))
                    }
                }
            });

            // 4️⃣ Recalcular estado de la venta
            const detallesVenta = await tx.detalleventa.findMany({
                where: { ventaId: data.ventaId }
            });

            const totalVendida = detallesVenta.reduce(
                (s, d) => s + d.cantidad,
                0
            );

            const totalAcreditada = detallesVenta.reduce(
                (s, d) => s + d.cantidadAcreditada,
                0
            );

            let nuevoEstado: 'ACTIVA' | 'PARCIALMENTE_ACREDITADA' | 'ACREDITADA' =
                'ACTIVA';

            if (totalAcreditada === totalVendida) {
                nuevoEstado = 'ACREDITADA';
            } else if (totalAcreditada > 0) {
                nuevoEstado = 'PARCIALMENTE_ACREDITADA';
            }

            await tx.venta.update({
                where: { id: data.ventaId },
                data: { estado: nuevoEstado }
            });

            return nota;
        });
    }


    async listar() {
        return prisma.nota_credito.findMany({
            orderBy: { fecha: 'desc' },
            include: {
                cliente: true,
                usuario: true,
                detalles: {
                    include: {
                        ventaDetalle: {
                            include: {
                                producto: true
                            }
                        }
                    }
                }
            }
        });
    }
}
