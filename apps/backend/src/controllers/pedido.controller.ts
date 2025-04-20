import { Request, Response } from 'express';
import { Pedido } from '../models/pedido.model';

export const PedidoController = {
  async create(req: Request, res: Response) {
    try {
      const result = await Pedido.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar pedido', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await Pedido.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Pedido.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Pedido não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await Pedido.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Pedido atualizado com sucesso' });
    res.status(404).json({ error: 'Pedido não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await Pedido.destroy({ where: { id } });
    if (deleted) return res.json({ message: 'Pedido removido com sucesso' });
    res.status(404).json({ error: 'Pedido não encontrado' });
  }
};
