import { prisma } from "../prisma.ts";
export class UsuarioRepository {
    async createUsuario(data) {
        return prisma.usuario.create({
            data: {
                ...data,
                tipoUsuario: {
                    connect: { id: 1 }
                }
            }
        });
    }
    async findByEmail(email) {
        return prisma.usuario.findUnique({
            where: { email }
        });
    }
    async findByDni(dni) {
        return prisma.usuario.findUnique({
            where: { dni }
        });
    }
    async findByEmailWithPassword(email) {
        return prisma.usuario.findUnique({
            where: { email }
        });
    }
}
