import { Request, Response, Router, NextFunction, RequestHandler } from 'express';
import { ClienteController } from '../controllers/cliente.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

// Rotas públicas
router.post('/', ClienteController.create);
router.post('/login', ClienteController.login);

// Rotas protegidas
router.get('/', ClienteController.findAll);
router.get('/:cpf', ClienteController.findById as RequestHandler);
router.put('/:cpf', ClienteController.update as RequestHandler);
router.delete('/:cpf', ClienteController.delete as RequestHandler);


export default router;