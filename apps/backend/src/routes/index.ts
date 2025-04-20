import { Express } from 'express';

import clienteRoutes from './cliente.routes';
import pedidoRoutes from './pedido.routes';
import pizzaRoutes from './pizza.routes';
import restauranteRoutes from './restaurante.routes';
import bebidaRoutes from './bebida.routes';
import itemDePedidoRoutes from './item_de_pedido.routes';
import bebidaDoPedidoRoutes from './bebida_do_pedido.routes';
import adicionalRoutes from './adicional.routes';
import adicionalDePedidoRoutes from './adicional_de_pedido.routes';
import transacaoDePagamentoRoutes from './transacao_de_pagamento.routes';

export function registerRoutes(app: Express) {
  app.use('/clientes', clienteRoutes);
  app.use('/pedidos', pedidoRoutes);
  app.use('/pizzas', pizzaRoutes);
  app.use('/restaurantes', restauranteRoutes);
  app.use('/bebidas', bebidaRoutes);
  app.use('/itens-pedido', itemDePedidoRoutes);
  app.use('/bebidas-pedido', bebidaDoPedidoRoutes);
  app.use('/adicionais', adicionalRoutes);
  app.use('/adicionais-pedido', adicionalDePedidoRoutes);
  app.use('/pagamentos', transacaoDePagamentoRoutes);
}
