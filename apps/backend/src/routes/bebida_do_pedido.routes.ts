import { Router, RequestHandler } from 'express';
import { BebidaDoPedidoController } from '../controllers/bebida_do_pedido.controller';

const router = Router();

router.post('/', BebidaDoPedidoController.create);
router.get('/', BebidaDoPedidoController.findAll);
router.get('/:id', BebidaDoPedidoController.findById as RequestHandler);
router.put('/:id', BebidaDoPedidoController.update as RequestHandler);
router.delete('/:id', BebidaDoPedidoController.delete as RequestHandler);

export default router;
