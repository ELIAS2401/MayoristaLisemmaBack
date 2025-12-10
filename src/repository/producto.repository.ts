import { prisma } from "../prisma.ts";

export class ProductoRepository {

    async obtenerProductos() {
        return prisma.producto.findMany();
    }
}