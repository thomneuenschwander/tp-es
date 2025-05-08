import { Request, Response } from 'express';
import Stripe from 'stripe';
import { AdicionalDePedido, BebidaDoPedido, ItemDePedido, Pedido, TransacaoDePagamento } from '../models';

let stripe: Stripe | null = null;

if (process.env.STRIPE_SECRET_KEY) {
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-04-30.basil', // Versão estável mais recente
  });
} else {
  console.warn('⚠️ STRIPE_SECRET_KEY não definida. Stripe desativado.');
}

interface CartItem {
  type: 'pizza' | 'drink';
  flavor?: string;
  name?: string;
  size?: string;
  price: number;
  quantity: number;
  idBack?: string;
  extras?: { idAdicional: string; nome: string }[];
}

interface Payload {
  items: CartItem[];
  total: number;
  cpfCliente: string;
  endereco: string;
  idRestaurante: number;
}

interface OrderDetailsPayload {
  sessionId: string;
  cpfCliente: string;
}

export const TransacaoDePagamentoController = {
  async createCheckoutSession(req: Request, res: Response) {
    if (!stripe) {
      return res.status(503).json({
        error: 'Stripe não configurado. Serviço de pagamento indisponível.',
      });
    }

    const { items, total, cpfCliente, endereco, idRestaurante }: Payload = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Itens do carrinho inválidos' });
    }
    if (!cpfCliente || !endereco || !idRestaurante || typeof total !== 'number') {
      return res.status(400).json({ error: 'Dados do pedido incompletos' });
    }

    try {
      const lineItems = items.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name:
              item.type === 'pizza'
                ? `${item.flavor} (${item.size})${
                    item.extras && item.extras.length > 0
                      ? ` (${item.extras.map((e) => e.nome).join(', ')})`
                      : ''
                  }`
                : item.name || 'Item',
            metadata: {
              type: item.type,
              idBack: item.idBack || '',
              ...(item.type === 'pizza' && item.extras
                ? { extras: JSON.stringify(item.extras.map((e) => e.nome)) }
                : {}),
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const metadata = {
        cpfCliente,
        endereco,
        idRestaurante: idRestaurante.toString(),
        total: total.toFixed(2),
        pizzas: JSON.stringify(
          items
            .filter((item) => item.type === 'pizza')
            .map((p) => ({
              idPizza: p.idBack,
              flavor: p.flavor,
              size: p.size,
              quantity: p.quantity,
              price: p.price,
              extras: p.extras?.map((e) => ({
                idAdicional: e.idAdicional,
                nome: e.nome,
              })),
            }))
        ),
        bebidas: JSON.stringify(
          items
            .filter((item) => item.type === 'drink')
            .map((b) => ({
              idBebida: b.idBack,
              name: b.name,
              quantity: b.quantity,
              price: b.price,
            }))
        ),
      };

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:5174/success?session_id={CHECKOUT_SESSION_ID}',
        cancel_url: 'http://localhost:5174/cart',
        metadata,
      });

      console.log(lineItems)

      res.json({
        url: session.url,
        sessionId: session.id,
      });
    } catch (error: any) {
      console.error('Erro ao criar sessão de checkout:', error);
      res.status(500).json({
        error: 'Erro ao criar sessão de checkout',
        details: error.message,
      });
    }
  },

  async getOrderDetailsBySessionId(req: Request, res: Response) {
    if (!stripe) {
      return res.status(503).json({
        error: 'Stripe não configurado. Serviço de pagamento indisponível.',
      });
    }

    const { sessionId, cpfCliente }: OrderDetailsPayload = req.body;

    if (!sessionId || !cpfCliente) {
      return res.status(400).json({ error: 'sessionId e cpfCliente são obrigatórios' });
    }

    try {
      // Verificar se a transação já existe para evitar duplicatas
      const existingTransaction = await TransacaoDePagamento.findOne({
        where: { stripeSessionId: sessionId },
      });

      if (existingTransaction) {
        const pedido = await Pedido.findByPk(existingTransaction.pedidoIdPedido);
        if (!pedido) {
          return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        if (pedido.cpfCliente !== cpfCliente) {
          return res.status(403).json({ error: 'Acesso não autorizado ao pedido' });
        }
        return res.json({
          idPedido: pedido.idPedido,
          preco: pedido.preco,
          status: pedido.status,
          endereco: pedido.endereco,
        });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      if (!session.metadata) {
        return res.status(400).json({ error: 'Metadados da sessão não encontrados' });
      }

      const metadataCpfCliente = session.metadata.cpfCliente;
      const endereco = session.metadata.endereco;
      const idRestaurante = Number(session.metadata.idRestaurante);
      const total = Number(session.metadata.total);
      const pizzas = JSON.parse(session.metadata.pizzas || '[]');
      const bebidas = JSON.parse(session.metadata.bebidas || '[]');

      if (!metadataCpfCliente || !endereco || !idRestaurante || !total || isNaN(total)) {
        return res.status(400).json({ error: 'Metadados da sessão incompletos ou inválidos' });
      }

      if (metadataCpfCliente !== cpfCliente) {
        return res.status(403).json({ error: 'Acesso não autorizado aos dados da sessão' });
      }

      if (session.payment_status !== 'paid') {
        return res.status(400).json({ error: 'Pagamento não foi concluído' });
      }

      const pedido = await Pedido.create({
        preco: total,
        status: 'confirmed',
        endereco,
        cpfCliente,
        idRestaurante,
      });

      for (const pizza of pizzas) {
        if (!pizza.idPizza || !pizza.size || !pizza.quantity) {
          console.warn('Dados de pizza incompletos:', pizza);
          continue;
        }
        await ItemDePedido.create({
          quantidade: pizza.quantity,
          tamanho: pizza.size,
          idPedido: pedido.idPedido,
          idPizza: Number(pizza.idPizza),
        });
      }

      for (const bebida of bebidas) {
        if (!bebida.idBebida || !bebida.quantity) {
          console.warn('Dados de bebida incompletos:', bebida);
          continue;
        }
        await BebidaDoPedido.create({
          quantidade: bebida.quantity,
          idBebida: Number(bebida.idBebida),
          idPedido: pedido.idPedido,
        });
      }

      for (const pizza of pizzas) {
        if (pizza.extras && pizza.extras.length > 0) {
          for (const extra of pizza.extras) {
            if (!extra.idAdicional) {
              console.warn('Dados de adicional incompletos:', extra);
              continue;
            }
            await AdicionalDePedido.create({
              quantidade: pizza.quantity,
              adicionalIdAdicional: Number(extra.idAdicional),
              pedidoIdPedido: pedido.idPedido,
            });
          }
        }
      }

      await TransacaoDePagamento.create({
        stripeSessionId: session.id,
        valor: total,
        pedidoIdPedido: pedido.idPedido,
      });

      res.json({
        idPedido: pedido.idPedido,
        preco: pedido.preco,
        status: pedido.status,
        endereco: pedido.endereco,
      });
    } catch (error: any) {
      console.error('Erro ao recuperar detalhes do pedido:', error);
      res.status(500).json({
        error: 'Erro ao recuperar detalhes do pedido',
        details: error.message,
      });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const result = await TransacaoDePagamento.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({
        error: 'Erro ao criar transação de pagamento',
        details: error,
      });
    }
  },

  async findAll(req: Request, res: Response) {
    const results = await TransacaoDePagamento.findAll();
    res.json(results);
  },

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await TransacaoDePagamento.findByPk(id);
    if (result) return res.json(result);
    res.status(404).json({ error: 'Transação de pagamento não encontrada' });
  },

  async update(req: Request, res: Response) {
    const { idTransacaoPagamento } = req.params;
    const [updated] = await TransacaoDePagamento.update(req.body, {
      where: { idTransacaoPagamento },
    });
    if (updated)
      return res.json({
        message: 'Transação de pagamento atualizada com sucesso',
      });
    res.status(404).json({ error: 'Transação de pagamento não encontrada' });
  },

  async delete(req: Request, res: Response) {
    const { idTransacaoPagamento } = req.params;
    const deleted = await TransacaoDePagamento.destroy({ where: { idTransacaoPagamento } });
    if (deleted)
      return res.json({
        message: 'Transação de pagamento removida com sucesso',
      });
    res.status(404).json({ error: 'Transação de pagamento não encontrada' });
  },
};