import { Router, RequestHandler } from 'express';
import { RestauranteController } from '../controllers/restaurante.controller';

const router = Router();

router.post('/', RestauranteController.create);
router.get('/', RestauranteController.findAll);
router.get('/:id', RestauranteController.findById as RequestHandler);
router.put('/:id', RestauranteController.update as RequestHandler);
router.delete('/:id', RestauranteController.delete as RequestHandler);

export default router;
