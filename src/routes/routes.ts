import { Router } from "express";
import productoRouter from "./productos/productos.routes.ts";
import clienteRouter from "./clientes/clientes.routes.ts";
import usuarioRouter from "./usuarios/usuarios.routes.ts";

export class AppRoutes {

    static get routes():Router {

        const router = Router();
        router.use("/productos", productoRouter);
        router.use("/clientes", clienteRouter);
        router.use("/usuarios", usuarioRouter);
        return router;
    }

}