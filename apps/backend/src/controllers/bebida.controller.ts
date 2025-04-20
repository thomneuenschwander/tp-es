import { Request, Response } from 'express';
import { Bebida } from '../models/bebida.model';

export const BebidaController = {
  async create(req: Request, res: Response) {
    try {
      const result = await Bebida.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar bebida', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await Bebida.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Bebida.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Bebida não encontrada' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await Bebida.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Bebida atualizada com sucesso' });
    res.status(404).json({ error: 'Bebida não encontrada' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await Bebida.destroy({ where: { id } });
    if (deleted) return res.json({ message: 'Bebida removida com sucesso' });
    res.status(404).json({ error: 'Bebida não encontrada' });
  }
};
