import { prisma } from '../prisma.js';

export class NotaCreditoRepository {

    async crearNotaCredito(data: {
        usuarioId: number;
        clienteId: number;
        items: {
            productoId: number;
            cantidad: number;
            precioUnitario: number;
        }[];
    }) {
        return prisma.$transaction(async (tx) => {

            const total = data.items.reduce(
                (sum, i) => sum + i.cantidad * Number(i.precioUnitario),
                0
            );

            const nota = await tx.nota_credito.create({
                data: {
                    usuarioId: data.usuarioId,
                    clienteId: data.clienteId,
                    total,
                    detalles: {
                        create: data.items.map(i => ({
                            productoId: i.productoId,
                            cantidad: i.cantidad,
                            precioUnitario: i.precioUnitario
                        }))
                    }
                }
            });

            // 🔁 restaurar stock
            for (const i of data.items) {
                await tx.producto.update({
                    where: { id: i.productoId },
                    data: { stock: { increment: i.cantidad } }
                });
            }

            return nota;
        });
    }

    listar() {
        return prisma.nota_credito.findMany({
            orderBy: { fecha: 'desc' },
            include: {
                cliente: true,
                usuario: true,
                detalles: {
                    include: { producto: true }
                }
            }
        });
    }
}
