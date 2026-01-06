import { Router } from "express";
import { UsuarioController } from "../../controllers/usuario.controller.ts";

const usuarioRouter = Router();
const usuarioController = new UsuarioController();

usuarioRouter.post('/registro', usuarioController.registro.bind(usuarioController));
usuarioRouter.post('/login', usuarioController.login.bind(usuarioController));

export default usuarioRouter;