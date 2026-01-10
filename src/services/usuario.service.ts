import { UsuarioRepository } from "../repository/usuario.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsuarioService {

    constructor(private usuarioRepository: UsuarioRepository) { }

    async crearUsuario(
        nombre: string,
        apellido: string,
        email: string,
        direccion: string,
        dni: string,
        password: string
    ) {
        if (!dni || dni.length < 7) {
            throw new Error('El DNI es inválido');
        }

        const emailExiste = await this.usuarioRepository.findByEmail(email);
        if (emailExiste) {
            throw new Error('El email ya está en uso');
        }

        const dniExiste = await this.usuarioRepository.findByDni(dni);
        if (dniExiste) {
            throw new Error('El DNI ya está en uso');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        return this.usuarioRepository.createUsuario({
            nombre,
            apellido,
            email,
            dni,
            direccion,
            password: hashedPassword
        });
    }


    async login(email: string, password: string) {
        const user = await this.usuarioRepository.findByEmailWithPassword(email);

        if (!user) {
            throw new Error('Credenciales inválidas');
        }

        const passwordValida = await bcrypt.compare(password, user.password);
        if (!passwordValida) {
            throw new Error('Credenciales inválidas');
        }

        const token = jwt.sign(
            {
                id: user.id,           
                email: user.email,
                tipoUsuarioId: user.tipoUsuarioId
            },
            process.env.JWT_SECRET!,
            { expiresIn: '8h' }
        );

        // ❗ nunca devolver la password
        const { password: _, ...userSinPassword } = user;

        return {
            token,
            user: userSinPassword
        };
    }
}