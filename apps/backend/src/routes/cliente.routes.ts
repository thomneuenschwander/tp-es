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

// // Handler wrapper para tratar funções assíncronas
// const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// // Rotas públicas
// router.post('/', asyncHandler(ClienteController.create));
// router.post('/login', asyncHandler(ClienteController.login));

// // Rotas protegidas
// router.get('/', authMiddleware, asyncHandler(ClienteController.findAll));
// router.get('/:cpf', authMiddleware, asyncHandler(ClienteController.findById));
// router.put('/:cpf', authMiddleware, asyncHandler(ClienteController.update));
// router.delete('/:cpf', authMiddleware, asyncHandler(ClienteController.delete));

export default router;