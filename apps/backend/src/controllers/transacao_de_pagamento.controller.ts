import { Request, Response } from 'express';
import { TransacaoDePagamento } from '../models/transacao_de_pagamento.model';

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
  }
};
