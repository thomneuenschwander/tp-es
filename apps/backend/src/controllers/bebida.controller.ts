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
    const bebidas = await Bebida.findAll();
  
    const bebidasComImagem = bebidas.map((bebida) => {
      // cria um nome de imagem com base no nome (ex: Coca-Cola -> coca.png)
      const nomeArquivo = bebida.nome.toLowerCase().replace(/\s/g, '_').replace(/[^\w]/g, '') + '.png'
  
      return {
        ...bebida.toJSON(),
        image: `/images/${nomeArquivo}`
      }
    });
  
    res.json(bebidasComImagem);
  },  

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await Bebida.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Bebida não encontrada' });
  },

  async update(req: Request, res: Response) {
    const { idBebida } = req.params;
    const [updated] = await Bebida.update(req.body, { where: { idBebida } });
    if (updated) return res.json({ message: 'Bebida atualizada com sucesso' });
    res.status(404).json({ error: 'Bebida não encontrada' });
  },

  async delete(req: Request, res: Response) {
    const { idBebida } = req.params;
    const deleted = await Bebida.destroy({ where: { idBebida } });
    if (deleted) return res.json({ message: 'Bebida removida com sucesso' });
    res.status(404).json({ error: 'Bebida não encontrada' });
  }
};
