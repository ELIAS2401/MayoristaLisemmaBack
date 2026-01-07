import { UsuarioRepository } from './../repository/usuario.repository.js';
import { UsuarioService } from "../services/usuario.service.js";
const usuarioRepository = new UsuarioRepository();
const usuarioService = new UsuarioService(usuarioRepository);
export class UsuarioController {
    constructor() {
        this.registro = async (req, res) => {
            try {
                const { nombre, apellido, email, direccion, dni, password } = req.body;
                const usuario = await usuarioService.crearUsuario(nombre, apellido, email, direccion, dni, password);
                return res.status(201).json(usuario);
            }
            catch (error) {
                return res.status(400).json({
                    message: error.message || 'Error al registrar usuario'
                });
            }
        };
        this.login = async (req, res) => {
            try {
                const { email, password } = req.body;
                const result = await usuarioService.login(email, password);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(401).json({
                    message: error.message || 'Credenciales inválidas'
                });
            }
        };
    }
}
