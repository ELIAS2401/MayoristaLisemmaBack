import {Router} from "express";
import { ProductoController } from "../../controllers/producto.controller.ts";

const productoRouter = Router();
const productoController = new ProductoController();

productoRouter.get('/', productoController.getProductos.bind(productoController));
// productoRouter.get('/:id', productoController.getJuegoPorId.bind(productoController));
// productoRouter.delete('/:id', productoController.eliminarJuego.bind(productoController));
// productoRouter.get('/imagenes/:id', productoController.getImagenesDeUnJuego.bind(productoController));
// productoRouter.get('/reviews/:id', productoController.getReviewsDeUnJuego.bind(productoController));

// productoRouter.post('/:id/review', productoController.agregarReviewAJuego.bind(productoController));

export default productoRouter;