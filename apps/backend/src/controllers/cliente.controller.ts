import { Request, Response } from 'express';
import { Cliente } from '../models/cliente.model';

export const ClienteController = {
  async create(req: Request, res: Response) {
    try {
      const cliente = await Cliente.create(req.body);
      res.status(201).json(cliente);
    } catch (error) {
      res.status(400).json({ error: 'Erro ao criar cliente', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  },

  async findById(req: Request, res: Response) {
    const { cpf } = req.params;
    const cliente = await Cliente.findByPk(cpf);
    if (cliente) return res.json(cliente);
    res.status(404).json({ error: 'Cliente não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { cpf } = req.params;
    const [updated] = await Cliente.update(req.body, { where: { cpf } });
    if (updated) return res.json({ message: 'Cliente atualizado com sucesso' });
    res.status(404).json({ error: 'Cliente não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { cpf } = req.params;
    const deleted = await Cliente.destroy({ where: { cpf } });
    if (deleted) return res.json({ message: 'Cliente removido com sucesso' });
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};
