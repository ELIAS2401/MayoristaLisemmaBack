import { prisma } from "../prisma.js";

export class ClienteRepository {

    async obtenerClientes() {
        return prisma.cliente.findMany();
    }

    async obtenerClientePorId(clienteId: number) {
    return prisma.cliente.findUnique({
        where: { id: clienteId },
    });
}

    async crearCliente(data: any) {
        return prisma.cliente.create({
            data: data
        });
    }

    async eliminarCliente(clienteId: number) {
        return prisma.cliente.delete({
            where: { id: clienteId }
        });
    }

    async updateCliente(clienteId: number, data: any) {
        return prisma.cliente.update({
            where: { id: clienteId },
            data: data
        });
    }
}