import { Request, Response } from 'express';
import { TransacaoDePagamento } from '../models/transacao_de_pagamento.model';
import Stripe from 'stripe';
import { Pedido } from '../models';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export const TransacaoDePagamentoController = {
  async create(req: Request, res: Response) {
    try {
      const result = await TransacaoDePagamento.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar transação de pagamento', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await TransacaoDePagamento.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TransacaoDePagamento.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Transação de pagamento não encontrada' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await TransacaoDePagamento.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Transação de pagamento atualizada com sucesso' });
    res.status(404).json({ error: 'Transação de pagamento não encontrada' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await TransacaoDePagamento.destroy({ where: { id } });
    if (deleted) return res.json({ message: 'Transação de pagamento removida com sucesso' });
    res.status(404).json({ error: 'Transação de pagamento não encontrada' });
  },

  async createCheckoutSession(req: Request, res: Response) {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Itens do carrinho inválidos' });
    }

    try {
      const total = items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

      const pedido = await Pedido.create({
        valorTotal: total,
        status: 'pending',
        endereco: 'Endereço não informado', 
        cpfCliente: '111', 
        idRestaurante: 1, 
        data: new Date(),
      });

      const lineItems = items.map((item: any) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.type === 'pizza' ? item.flavor : item.name,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:3000/cart',
        metadata: {
          pedidoIdPedido: pedido.idPedido.toString(),
        },
      });

      const transacao = await TransacaoDePagamento.create({
        metodoPagamento: 'card',
        numeroCartao: null,
        validadeCartao: null,
        codigoCVC: null,
        valor: total,
        pedidoIdPedido: pedido.idPedido,
        status: 'pending',
        stripeSessionId: session.id,
        data: new Date(),
      });

      res.json({ url: session.url, transacaoId: transacao.idTransacaoPagamento });
    } catch (error:any) {
      console.error('Erro ao criar sessão de checkout:', error);
      res.status(500).json({ error: 'Erro ao criar sessão de checkout', details: error.message });
    }
  },

  async verifySession(req: Request, res: Response) {
    const { session_id } = req.query;

    if (!session_id || typeof session_id !== 'string') {
      return res.status(400).json({ error: 'ID da sessão inválido' });
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(session_id);

      const transacao = await TransacaoDePagamento.findOne({
        where: { stripeSessionId: session_id },
      });

      if (!transacao) {
        return res.status(404).json({ error: 'Transação não encontrada' });
      }

      if (session.payment_status === 'paid') {
        await transacao.update({ status: 'completed' });
      } else if (session.payment_status === 'unpaid') {
        await transacao.update({ status: 'failed' });
      }

      res.json({ status: session.payment_status, transacao });
    } catch (error: any) {
      console.error('Erro ao verificar sessão:', error);
      res.status(500).json({ error: 'Erro ao verificar sessão', details: error.message });
    }
  },
};
