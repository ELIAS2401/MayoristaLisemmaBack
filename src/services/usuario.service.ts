import { UsuarioRepository } from "../repository/usuario.repository.ts";
import bcrypt from "bcrypt";

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

}