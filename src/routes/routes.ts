import { Router } from "express";
import productoRouter from "./productos/productos.routes.ts";

export class AppRoutes {

    static get routes():Router {

        const router = Router();
        router.use("/productos", productoRouter);
      
        return router;
    }

}