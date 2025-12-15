import { prisma } from "../prisma.ts";

export class UsuarioRepository {
    
    async createUsuario(data: {
        dni: string;
        nombre: string;
        apellido: string;
        email: string;
        direccion?: string;
        telefono?: string;
        zona?: string;
        password: string;
    }) {
        return prisma.usuario.create({
            data: {
                ...data,
                tipoUsuario: {
                    connect: { id: 1 }
                }
            }
        });
    }


    async findByEmail(email: string) {
        return prisma.usuario.findUnique({
            where: { email }
        });
    }

    async findByDni(dni: string) {
        return prisma.usuario.findUnique({
            where: { dni }
        });
    }


}