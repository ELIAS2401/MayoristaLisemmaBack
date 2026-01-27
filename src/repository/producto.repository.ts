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
            stockAReponer,
            stock,
            ...resto
        } = data;

        const updateData: any = {
            ...resto
        };

        if (stockAReponer !== undefined) {

            if (Number(stockAReponer) <= 0) {
                throw new Error("La reposición debe ser mayor a 0");
            }

            updateData.stock = {
                increment: Number(stockAReponer)
            };
        }

        return prisma.producto.update({
            where: { id: productoId },
            data: updateData
        });
    }


}