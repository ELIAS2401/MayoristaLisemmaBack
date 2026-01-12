import { Router } from 'express';
import { NotaCreditoController } from '../../controllers/nota-credito.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const controller = new NotaCreditoController();
const router = Router();

router.get('/', authMiddleware, controller.listar);
router.get('/venta/:ventaId', authMiddleware, controller.listarPorVenta);
router.post('/:id', authMiddleware, controller.crear);
export default router;
