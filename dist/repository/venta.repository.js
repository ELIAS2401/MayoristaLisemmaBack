import { prisma } from "../prisma.js";
export class VentaRepository {
    async obtenerVentas() {
        return prisma.venta.findMany({
            orderBy: { fecha: 'desc' },
            include: {
                cliente: true,
                usuario: true,
                detalles: {
                    include: {
                        producto: true
                    }
                }
            }
        });
    }
    async crearVentaConDetalleYStock(data) {
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
                    usuarioId: 1, // ⚠️ después lo sacás del token
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
    async anularVenta(ventaId) {
        const venta = await prisma.venta.findUnique({
            where: { id: ventaId },
            include: {
                detalles: true
            }
        });
        if (!venta || venta.estado === 'ANULADA') {
            throw new Error('Venta inválida');
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
