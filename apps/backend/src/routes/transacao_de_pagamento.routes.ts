import { Router, RequestHandler } from 'express';
import { TransacaoDePagamentoController } from '../controllers/transacao_de_pagamento.controller';

const router = Router();

router.post('/', TransacaoDePagamentoController.create);
router.get('/', TransacaoDePagamentoController.findAll);
router.get('/:id', TransacaoDePagamentoController.findById as RequestHandler);
router.put('/:id', TransacaoDePagamentoController.update as RequestHandler);
router.delete('/:id', TransacaoDePagamentoController.delete as RequestHandler);
router.post('/create-checkout-session', TransacaoDePagamentoController.createCheckoutSession as RequestHandler);
router.post('/order-details', TransacaoDePagamentoController.getOrderDetailsBySessionId as RequestHandler);

export default router;
