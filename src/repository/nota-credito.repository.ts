import { prisma } from '../prisma.js';

export class NotaCreditoRepository {

    async crearNotaCredito(
        ventaId: number,
        usuarioId: number,
        items: {
            productoId: number;
            cantidad: number;
            precioUnitario: number;
        }[]
    ) {
        return prisma.$transaction(async (tx) => {

            const venta = await tx.venta.findUnique({
                where: { id: ventaId },
                include: {
                    detalles: true,
                    notasCredito: {
                        include: { detalles: true }
                    }
                }
            });

            if (!venta || venta.estado === 'ANULADA') {
                throw new Error('Venta inválida');
            }

            // 🔹 calcular devoluciones previas por producto
            const devueltoPorProducto = new Map<number, number>();

            for (const nc of venta.notasCredito) {
                for (const d of nc.detalles) {
                    devueltoPorProducto.set(
                        d.productoId,
                        (devueltoPorProducto.get(d.productoId) || 0) + d.cantidad
                    );
                }
            }

            // 🔹 validar cantidades disponibles
            for (const item of items) {
                const vendido = venta.detalles.find(
                    d => d.productoId === item.productoId
                );

                if (!vendido) {
                    throw new Error('Producto no pertenece a la venta');
                }

                const yaDevuelto = devueltoPorProducto.get(item.productoId) || 0;
                const disponible = vendido.cantidad - yaDevuelto;

                if (item.cantidad > disponible) {
                    throw new Error(
                        `Cantidad inválida. Disponible para devolver: ${disponible}`
                    );
                }
            }

            const total = items.reduce(
                (sum, i) => sum + i.cantidad * Number(i.precioUnitario),
                0
            );

            // 🔹 crear nota de crédito
            const nota = await tx.nota_credito.create({
                data: {
                    ventaId,
                    usuarioId,
                    total,
                    detalles: {
                        create: items.map(i => ({
                            productoId: i.productoId,
                            cantidad: i.cantidad,
                            precioUnitario: i.precioUnitario
                        }))
                    }
                }
            });

            // 🔹 restaurar stock
            for (const i of items) {
                await tx.producto.update({
                    where: { id: i.productoId },
                    data: { stock: { increment: i.cantidad } }
                });
            }

            return nota;
        });
    }

    async listar() {
        return prisma.nota_credito.findMany({
            orderBy: { fecha: 'desc' },
            include: {
                usuario: true,
                venta: true,
                detalles: { include: { producto: true } }
            }
        });
    }

    async listarPorVenta(ventaId: number) {
        return prisma.nota_credito.findMany({
            where: { ventaId },
            include: {
                detalles: { include: { producto: true } }
            }
        });
    }
}
