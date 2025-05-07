import { Router, RequestHandler } from 'express';
import { PedidoController } from '../controllers/pedido.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.post('/', PedidoController.create);
router.get('/', PedidoController.findAll);
router.get('/:id', PedidoController.findById as RequestHandler);
router.put('/:id', PedidoController.update as RequestHandler);
router.delete('/:id', PedidoController.delete as RequestHandler);

// Rota para criar um pedido completo
router.post('/completo', PedidoController.createCompleteOrder as RequestHandler);

// GET /pedidos/cliente/:cpf
router.get('/cliente/:cpf', PedidoController.findByClienteCpf as RequestHandler);

export default router;
