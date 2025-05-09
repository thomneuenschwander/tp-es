import { Request, Response } from 'express';
import { Pizza } from '../models/pizza.model';

export const PizzaController = {
  async create(req: Request, res: Response) {
    try {
      const result = await Pizza.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar pizza', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await Pizza.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Pizza.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Pizza não encontrada' });
  },

  async update(req: Request, res: Response) {
    const { idPizza } = req.params;
    const [updated] = await Pizza.update(req.body, { where: { idPizza } });
    if (updated) return res.json({ message: 'Pizza atualizada com sucesso' });
    res.status(404).json({ error: 'Pizza não encontrada' });
  },

  async delete(req: Request, res: Response) {
    const { idPizza } = req.params;
    const deleted = await Pizza.destroy({ where: { idPizza } });
    if (deleted) return res.json({ message: 'Pizza removida com sucesso' });
    res.status(404).json({ error: 'Pizza não encontrada' });
  }
};
