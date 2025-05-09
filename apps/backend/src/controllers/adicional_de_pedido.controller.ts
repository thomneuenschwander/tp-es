import { Request, Response } from 'express';
import { AdicionalDePedido } from '../models/adicional_de_pedido.model';

export const AdicionalDePedidoController = {
  async create(req: Request, res: Response) {
    try {
      const result = await AdicionalDePedido.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar adicional do pedido', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await AdicionalDePedido.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await AdicionalDePedido.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Adicional do pedido não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { idAdicionalPedido } = req.params;
    const [updated] = await AdicionalDePedido.update(req.body, { where: { idAdicionalPedido } });
    if (updated) return res.json({ message: 'Adicional do pedido atualizado com sucesso' });
    res.status(404).json({ error: 'Adicional do pedido não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { idAdicionalPedido } = req.params;
    const deleted = await AdicionalDePedido.destroy({ where: { idAdicionalPedido } });
    if (deleted) return res.json({ message: 'Adicional do pedido removido com sucesso' });
    res.status(404).json({ error: 'Adicional do pedido não encontrado' });
  }
};
