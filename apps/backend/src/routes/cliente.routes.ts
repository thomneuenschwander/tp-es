import { RequestHandler, Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Rotas públicas
router.post('/', ClienteController.create);
router.post('/login', ClienteController.login);

// Rotas protegidas
router.get('/', authMiddleware, ClienteController.findAll);
router.get('/:cpf', authMiddleware, ClienteController.findById as RequestHandler);
router.put('/:cpf', authMiddleware, ClienteController.update as RequestHandler);
router.delete('/:cpf', authMiddleware, ClienteController.delete as RequestHandler);

export default router;
