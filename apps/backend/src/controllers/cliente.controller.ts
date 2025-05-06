import { Request, Response } from 'express';
import { Cliente } from '../models/cliente.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const ClienteController = {
  async create(req: Request, res: Response) {
    try {
      const { email, senha, ...rest } = req.body;
      
      const clienteExists = await Cliente.findOne({ where: { email } });
      if (clienteExists) {
        return res.status(400).json({ error: 'Email já cadastrado' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);
      const cliente = await Cliente.create({
        ...rest,
        email,
        senha: hashedPassword
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
      if (!cliente) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const validPassword = await bcrypt.compare(senha, cliente.senha);
      if (!validPassword) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      const token = jwt.sign(
        { cpf: cliente.cpf },
        process.env.JWT_SECRET!,
        { expiresIn: '1d' }
      );

      return res.json({
        cliente: {
          cpf: cliente.cpf,
          nome: cliente.nome,
          email: cliente.email,
          telefone: cliente.telefone
        },
        token
      });
    } catch (error) {
      return res.status(400).json({ error: 'Erro ao fazer login', details: error });
    }
  },

  async findAll(req: Request, res: Response) {
    const clientes = await Cliente.findAll({
      attributes: { exclude: ['senha'] }
    });
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
      if (senha) {
        const hashedPassword = await bcrypt.hash(senha, 10);
        const [updated] = await Cliente.update(
          { ...updateData, senha: hashedPassword },
          { where: { cpf } }
        );
        if (updated) return res.json({ message: 'Cliente atualizado com sucesso' });
      } else {
        const [updated] = await Cliente.update(updateData, { where: { cpf } });
        if (updated) return res.json({ message: 'Cliente atualizado com sucesso' });
      }
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
