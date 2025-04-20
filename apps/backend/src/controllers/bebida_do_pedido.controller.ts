import { Request, Response } from 'express';
import { BebidaDoPedido } from '../models/bebida_do_pedido.model';

export const BebidaDoPedidoController = {
  async create(req: Request, res: Response) {
    try {
      const result = await BebidaDoPedido.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar bebida do pedido', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await BebidaDoPedido.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await BebidaDoPedido.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Bebida do pedido não encontrada' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await BebidaDoPedido.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Bebida do pedido atualizada com sucesso' });
    res.status(404).json({ error: 'Bebida do pedido não encontrada' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await BebidaDoPedido.destroy({ where: { id } });
    if (deleted) return res.json({ message: 'Bebida do pedido removida com sucesso' });
    res.status(404).json({ error: 'Bebida do pedido não encontrada' });
  }
};
