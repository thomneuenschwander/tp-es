import { Router, RequestHandler } from 'express';
import { AdicionalDePedidoController } from '../controllers/adicional_de_pedido.controller';

const router = Router();

router.post('/', AdicionalDePedidoController.create);
router.get('/', AdicionalDePedidoController.findAll);
router.get('/:id', AdicionalDePedidoController.findById as RequestHandler);
router.put('/:id', AdicionalDePedidoController.update as RequestHandler);
router.delete('/:id', AdicionalDePedidoController.delete as RequestHandler);

export default router;
