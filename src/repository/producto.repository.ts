import { prisma } from "../prisma.ts";

export class ProductoRepository {

    async obtenerProductos() {
        return prisma.producto.findMany({
            include: {
                categoria: true
            }
        });
    }

    async obtenerProductoPorId(productoId: number) {
    return prisma.producto.findUnique({
        where: { id: productoId },
        include: {
            categoria: true
        }
    });
}

    async crearProducto(data: any) {
        return prisma.producto.create({
            data: data
        });
    }

    async eliminarProducto(productoId: number) {
        return prisma.producto.delete({
            where: { id: productoId }
        });
    }

    async updateProducto(productoId: number, data: any) {
        return prisma.producto.update({
            where: { id: productoId },
            data: data
        });
    }
}