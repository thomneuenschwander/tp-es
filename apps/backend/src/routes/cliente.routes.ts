import { RequestHandler, Router } from 'express';
import { ClienteController } from '../controllers/cliente.controller';

const router = Router();

router.post('/', ClienteController.create);
router.get('/', ClienteController.findAll);
router.get('/:cpf', ClienteController.findById as RequestHandler);
router.put('/:cpf', ClienteController.update as RequestHandler);
router.delete('/:cpf', ClienteController.delete as RequestHandler);

export default router;
