import { prisma } from "../prisma.js";
export class ClienteRepository {
    async obtenerClientes() {
        return prisma.cliente.findMany();
    }
    async obtenerClientePorId(clienteId) {
        return prisma.cliente.findUnique({
            where: { id: clienteId },
        });
    }
    async crearCliente(data) {
        return prisma.cliente.create({
            data: data
        });
    }
    async eliminarCliente(clienteId) {
        return prisma.cliente.delete({
            where: { id: clienteId }
        });
    }
    async updateCliente(clienteId, data) {
        return prisma.cliente.update({
            where: { id: clienteId },
            data: data
        });
    }
}
