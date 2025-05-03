import { Request, Response } from 'express';
import { Restaurante } from '../models/restaurante.model';

export const RestauranteController = {
  async create(req: Request, res: Response) {
    try {
      const result = await Restaurante.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar restaurante', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await Restaurante.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Restaurante.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Restaurante não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await Restaurante.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Restaurante atualizado com sucesso' });
    res.status(404).json({ error: 'Restaurante não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await Restaurante.destroy({ where: { id } });
    if (deleted) return res.json({ message: 'Restaurante removido com sucesso' });
    res.status(404).json({ error: 'Restaurante não encontrado' });
  }
};
