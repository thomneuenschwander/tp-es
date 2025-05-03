import { Router, RequestHandler } from 'express';
import { ItemDePedidoController } from '../controllers/item_de_pedido.controller';

const router = Router();

router.post('/', ItemDePedidoController.create);
router.get('/', ItemDePedidoController.findAll);
router.get('/:id', ItemDePedidoController.findById as RequestHandler);
router.put('/:id', ItemDePedidoController.update as RequestHandler);
router.delete('/:id', ItemDePedidoController.delete as RequestHandler);

export default router;
