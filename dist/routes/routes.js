import { Router } from "express";
import productoRouter from "./productos/productos.routes.js";
import clienteRouter from "./clientes/clientes.routes.js";
import usuarioRouter from "./usuarios/usuarios.routes.js";
import ventaRouter from "./ventas/ventas.routes.js";
export class AppRoutes {
    static get routes() {
        const router = Router();
        router.use("/productos", productoRouter);
        router.use("/clientes", clienteRouter);
        router.use("/usuarios", usuarioRouter);
        router.use("/ventas", ventaRouter);
        return router;
    }
}
