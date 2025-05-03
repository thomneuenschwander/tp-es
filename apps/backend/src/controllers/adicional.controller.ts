import { Request, Response } from 'express';
import { Adicional } from '../models/adicional.model';

export const AdicionalController = {
  async create(req: Request, res: Response) {
    try {
      const result = await Adicional.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar adicional', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await Adicional.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Adicional.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Adicional não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await Adicional.update(req.body, { where: { id } });
    if (updated) return res.json({ message: 'Adicional atualizado com sucesso' });
    res.status(404).json({ error: 'Adicional não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await Adicional.destroy({ where: { id } });
    if (deleted) return res.json({ message: 'Adicional removido com sucesso' });
    res.status(404).json({ error: 'Adicional não encontrado' });
  }
};
