import { Router, RequestHandler } from 'express';
import { PedidoController } from '../controllers/pedido.controller';

const router = Router();

router.post('/', PedidoController.create);
router.get('/', PedidoController.findAll);
router.get('/:id', PedidoController.findById as RequestHandler);
router.put('/:id', PedidoController.update as RequestHandler);
router.delete('/:id', PedidoController.delete as RequestHandler);

export default router;
