import { Router, RequestHandler } from 'express';
import { AdicionalController } from '../controllers/adicional.controller';

const router = Router();

router.post('/', AdicionalController.create);
router.get('/', AdicionalController.findAll);
router.get('/:id', AdicionalController.findById as RequestHandler);
router.put('/:id', AdicionalController.update as RequestHandler);
router.delete('/:id', AdicionalController.delete as RequestHandler);

export default router;
