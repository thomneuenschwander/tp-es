import { Request, Response } from 'express';
import { Cliente } from '../models/cliente.model';
import jwt from 'jsonwebtoken';

export const ClienteController = {
  async create(req: Request, res: Response) {
    try {
      const { email, senha, ...rest } = req.body;

      const clienteExists = await Cliente.findOne({ where: { email } });
      if (clienteExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const cliente = await Cliente.create({
        ...rest,
        email,
        senha // ← senha salva em texto puro
      });

      const token = jwt.sign(
        { cpf: cliente.cpf },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );

      return res.status(201).json({
        cliente: {
          cpf: cliente.cpf,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone
        },
        token
      });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao criar cliente', details: error });
    }
  },

  async login(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const cliente = await Cliente.findOne({ where: { email } });
      console.log(cliente)
      if (!cliente || cliente.senha !== senha) {
        return res.status(401).json({ logado: false });
      }

      return res.json({
        logado: true,
        cpf: cliente.cpf
      });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao fazer login', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  },

  async findById(req: Request, res: Response) {
    const { cpf } = req.params;
    const cliente = await Cliente.findByPk(cpf, {
      attributes: { exclude: ['senha'] }
    });
    if (cliente) return res.json(cliente);
    res.status(404).json({ error: 'Cliente não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { cpf } = req.params;
    const { senha, ...updateData } = req.body;

    try {
      const [updated] = await Cliente.update(
        senha ? { ...updateData, senha } : updateData,
        { where: { cpf } }
      );
      if (updated) return res.json({ message: 'Cliente atualizado com sucesso' });

      res.status(404).json({ error: 'Cliente não encontrado' });
    } catch (error) {
      res.status(400).json({ error: 'Erro ao atualizar cliente', details: error });
    }
  },

  async delete(req: Request, res: Response) {
    const { cpf } = req.params;
    const deleted = await Cliente.destroy({ where: { cpf } });
    if (deleted) return res.json({ message: 'Cliente removido com sucesso' });
    res.status(404).json({ error: 'Cliente não encontrado' });
  }
};
