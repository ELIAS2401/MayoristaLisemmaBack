import { Router } from "express";
import { VentaController } from "../../controllers/venta.controller.js";
const ventaRouter = Router();
const ventaController = new VentaController();
ventaRouter.get('/', ventaController.getVentas.bind(ventaController));
ventaRouter.patch('/:id/anular', ventaController.anularVenta.bind(ventaController));
ventaRouter.post('/', ventaController.crearVenta.bind(ventaController));
export default ventaRouter;
