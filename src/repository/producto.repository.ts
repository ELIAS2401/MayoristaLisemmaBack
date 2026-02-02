import { prisma } from "../prisma.js";

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
        return prisma.producto.update({
            where: { id: productoId },
            data: { activo: false }
        });
    }

    async updateProducto(productoId: number, data: any) {

        const {
            stock,
            activo,
            ...resto
        } = data;

        const updateData: any = {
            ...resto
        };

        if (activo !== undefined) {
            updateData.activo = Boolean(activo);
        }

        if (stock !== undefined) {

            if (Number(stock) < 0) {
                throw new Error("El stock no puede ser negativo");
            }

            updateData.stock = Number(stock);
        }

        return prisma.producto.update({
            where: { id: productoId },
            data: updateData
        });
    }
}