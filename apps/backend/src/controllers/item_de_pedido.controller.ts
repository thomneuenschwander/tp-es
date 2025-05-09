import { Request, Response } from 'express';
import { ItemDePedido } from '../models/item_de_pedido.model';

export const ItemDePedidoController = {
  async create(req: Request, res: Response) {
    try {
      const result = await ItemDePedido.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar item de pedido', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await ItemDePedido.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ItemDePedido.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Item de pedido não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { idItemPedido } = req.params;
    const [updated] = await ItemDePedido.update(req.body, { where: { idItemPedido } });
    if (updated) return res.json({ message: 'Item de pedido atualizado com sucesso' });
    res.status(404).json({ error: 'Item de pedido não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { idItemPedido } = req.params;
    const deleted = await ItemDePedido.destroy({ where: { idItemPedido } });
    if (deleted) return res.json({ message: 'Item de pedido removido com sucesso' });
    res.status(404).json({ error: 'Item de pedido não encontrado' });
  }
};
