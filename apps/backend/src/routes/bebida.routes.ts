import { Router, RequestHandler } from 'express';
import { BebidaController } from '../controllers/bebida.controller';

const router = Router();

router.post('/', BebidaController.create);
router.get('/', BebidaController.findAll);
router.get('/:id', BebidaController.findById as RequestHandler);
router.put('/:id', BebidaController.update as RequestHandler);
router.delete('/:id', BebidaController.delete as RequestHandler);

export default router;
