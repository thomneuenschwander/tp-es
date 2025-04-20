import { Router, RequestHandler } from 'express';
import { PizzaController } from '../controllers/pizza.controller';

const router = Router();

router.post('/', PizzaController.create);
router.get('/', PizzaController.findAll);
router.get('/:id', PizzaController.findById as RequestHandler);
router.put('/:id', PizzaController.update as RequestHandler);
router.delete('/:id', PizzaController.delete as RequestHandler);

export default router;
