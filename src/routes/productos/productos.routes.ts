import { Router } from "express";
import { ProductoController } from "../../controllers/producto.controller.ts";

////////////////////////////DEBO PONER EN VENTA CONTROLER EL SERVICIO  Y NO EN EL CONTSTRUCTOR ME PARECE
const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get('/', productoController.getProductos.bind(productoController));
productoRouter.get('/:id', productoController.getProductoPorId.bind(productoController));
productoRouter.delete('/:id', productoController.eliminarProducto.bind(productoController));
productoRouter.put('/:id', productoController.updateProducto.bind(productoController));
productoRouter.post('/', productoController.agregarProducto.bind(productoController));

export default productoRouter;