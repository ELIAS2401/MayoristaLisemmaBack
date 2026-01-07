import { prisma } from "../prisma.js";
export class ProductoRepository {
    async obtenerProductos() {
        return prisma.producto.findMany({
            include: {
                categoria: true
            }
        });
    }
    async obtenerProductoPorId(productoId) {
        return prisma.producto.findUnique({
            where: { id: productoId },
            include: {
                categoria: true
            }
        });
    }
    async crearProducto(data) {
        return prisma.producto.create({
            data: data
        });
    }
    async eliminarProducto(productoId) {
        return prisma.producto.delete({
            where: { id: productoId }
        });
    }
    async updateProducto(productoId, data) {
        return prisma.producto.update({
            where: { id: productoId },
            data: data
        });
    }
}
