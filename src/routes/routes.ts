import { Router } from "express";
import productoRouter from "./productos/productos.routes.ts";
import clienteRouter from "./clientes/clientes.routes.ts";
import usuarioRouter from "./usuarios/usuarios.routes.ts";
import ventaRouter from "./ventas/ventas.routes.ts";

export class AppRoutes {

    static get routes():Router {

        const router = Router();
        router.use("/productos", productoRouter);
        router.use("/clientes", clienteRouter);
        router.use("/usuarios", usuarioRouter);
        router.use("/ventas", ventaRouter);
        return router;
    }

}