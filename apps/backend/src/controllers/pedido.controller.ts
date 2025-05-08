import { Request, Response } from 'express';
import { Pedido, ItemDePedido, BebidaDoPedido, AdicionalDePedido, Pizza, Bebida, Adicional } from '../models';
import { sequelize } from '../config/database';

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
    const result = await Pedido.findByPk(id, {
      include: [
        {
          model: ItemDePedido,
          include: ['Pizza']
        },
        {
          model: BebidaDoPedido,
          include: ['Bebida']
        },
        {
          model: AdicionalDePedido,
          include: ['Adicional']
        }
      ]
    });
    if (result) return res.json(result);
    res.status(404).json({ error: 'Pedido não encontrado' });
  },

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const [updated] = await Pedido.update(req.body, { where: { idPedido: id } });
    if (updated) return res.json({ message: 'Pedido atualizado com sucesso' });
    res.status(404).json({ error: 'Pedido não encontrado' });
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const deleted = await Pedido.destroy({ where: { idPedido: id } });
    if (deleted) return res.json({ message: 'Pedido removido com sucesso' });
    res.status(404).json({ error: 'Pedido não encontrado' });
  },

  async createCompleteOrder(req: Request, res: Response): Promise<void> {
    const transaction = await sequelize.transaction();

    try {
      const {
        preco,
        status,
        endereco,
        idRestaurante,
        itens,
        bebidas,
        adicionais
      } = req.body;

      // Criar o pedido principal
      const pedido = await Pedido.create({
        preco,
        status,
        endereco,
        cpfCliente: req.body.cpfCliente,
        idRestaurante
      }, { transaction });

      // Criar os itens do pedido (pizzas)
      if (itens && itens.length > 0) {
        await Promise.all(
          itens.map((item: any) =>
            ItemDePedido.create({
              quantidade: item.quantidade,
              idPedido: pedido.idPedido,
              idPizza: item.idPizza,
              tamanho: ''
            }, { transaction })
          )
        );
      }

      // Criar as bebidas do pedido
      if (bebidas && bebidas.length > 0) {
        await Promise.all(
          bebidas.map((bebida: any) =>
            BebidaDoPedido.create({
              quantidade: bebida.quantidade,
              idPedido: pedido.idPedido,
              idBebida: bebida.idBebida
            }, { transaction })
          )
        );
      }

      // Criar os adicionais do pedido
      if (adicionais && adicionais.length > 0) {
        await Promise.all(
          adicionais.map((adicional: any) =>
            AdicionalDePedido.create({
              quantidade: adicional.quantidade,
              pedidoIdPedido: pedido.idPedido,
              adicionalIdAdicional: adicional.idAdicional
            }, { transaction })
          )
        );
      }

      await transaction.commit();

      // Buscar o pedido completo com todos os relacionamentos
      const pedidoCompleto = await Pedido.findByPk(pedido.idPedido, {
        include: [
          {
            model: ItemDePedido,
            include: ['Pizza']
          },
          {
            model: BebidaDoPedido,
            include: ['Bebida']
          },
          {
            model: AdicionalDePedido,
            include: ['Adicional']
          }
        ]
      });

      res.status(201).json(pedidoCompleto);
    } catch (error) {
      await transaction.rollback();
      res.status(400).json({ error: 'Erro ao criar pedido', details: error });
    }
  },

  async findByClienteCpf(req: Request, res: Response): Promise<void> {
    try {
      const { cpf } = req.params;
      const pedidos = await Pedido.findAll({
        where: { cpfCliente: cpf },
        include: [
          {
            model: ItemDePedido,
            as: 'ItemDePedidos', 
            include: [
              {
                model: Pizza,
                as: 'Pizza', 
              },
            ],
          },
          {
            model: BebidaDoPedido,
            as: 'BebidaDoPedidos', 
            include: [
              {
                model: Bebida,
                as: 'Bebida', 
              },
            ],
          },
          {
            model: AdicionalDePedido,
            as: 'AdicionalDePedidos', 
            include: [
              {
                model: Adicional,
                as: 'Adicional', 
              },
            ],
          },
        ],
      });

      if (!pedidos || pedidos.length === 0) {
        res.status(404).json({ error: 'Nenhum pedido encontrado para esse cliente' });
        return;
      }

      res.json(pedidos);
    } catch (error: any) {
      console.error('Erro ao buscar pedidos:', error);
      res.status(400).json({ error: 'Erro ao buscar pedidos', details: error.message });
    }
  },
  
};
