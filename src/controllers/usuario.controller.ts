import { UsuarioRepository } from './../repository/usuario.repository.js';
import { type Request, type Response } from "express";
import { UsuarioService } from "../services/usuario.service.js";

const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {

    constructor() { }

    public registro = async (req: Request, res: Response) => {
        try {
            const { nombre, apellido, email, direccion, dni, password } = req.body;

            const usuario = await usuarioService.crearUsuario(
                nombre,
                apellido,
                email,
                direccion,
                dni,
                password
            );

            return res.status(201).json(usuario);

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || 'Error al registrar usuario'
            });
        }
    };

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const result = await usuarioService.login(email, password);

            return res.status(200).json(result);

        } catch (error: any) {
            return res.status(401).json({
                message: error.message || 'Credenciales inválidas'
            });
        }
    };
}