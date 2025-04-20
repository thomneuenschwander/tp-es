import { sequelize } from '../config/database';
import { Cliente } from './cliente.model';
import { Restaurante } from './restaurante.model';
import { Pedido } from './pedido.model';
import { Pizza } from './pizza.model';
import { ItemDePedido } from './item_de_pedido.model';
import { Bebida } from './bebida.model';
import { BebidaDoPedido } from './bebida_do_pedido.model';
import { Adicional } from './adicional.model';
import { AdicionalDePedido } from './adicional_de_pedido.model';
import { TransacaoDePagamento } from './transacao_de_pagamento.model';

// Cliente ↔️ Pedido
Cliente.hasMany(Pedido, { foreignKey: 'cpfCliente' });
Pedido.belongsTo(Cliente, { foreignKey: 'cpfCliente' });

// Restaurante ↔️ Pedido
Restaurante.hasMany(Pedido, { foreignKey: 'idRestaurante' });
Pedido.belongsTo(Restaurante, { foreignKey: 'idRestaurante' });

// Pedido ↔️ ItemDePedido
Pedido.hasMany(ItemDePedido, { foreignKey: 'idPedido' });
ItemDePedido.belongsTo(Pedido, { foreignKey: 'idPedido' });

// Pizza ↔️ ItemDePedido
Pizza.hasMany(ItemDePedido, { foreignKey: 'idPizza' });
ItemDePedido.belongsTo(Pizza, { foreignKey: 'idPizza' });

// Pedido ↔️ BebidaDoPedido
Pedido.hasMany(BebidaDoPedido, { foreignKey: 'idPedido' });
BebidaDoPedido.belongsTo(Pedido, { foreignKey: 'idPedido' });

// Bebida ↔️ BebidaDoPedido
Bebida.hasMany(BebidaDoPedido, { foreignKey: 'idBebida' });
BebidaDoPedido.belongsTo(Bebida, { foreignKey: 'idBebida' });

// Pedido ↔️ AdicionalDePedido
Pedido.hasMany(AdicionalDePedido, { foreignKey: 'pedidoIdPedido' });
AdicionalDePedido.belongsTo(Pedido, { foreignKey: 'pedidoIdPedido' });

// Adicional ↔️ AdicionalDePedido
Adicional.hasMany(AdicionalDePedido, { foreignKey: 'adicionalIdAdicional' });
AdicionalDePedido.belongsTo(Adicional, { foreignKey: 'adicionalIdAdicional' });

// Pedido ↔️ TransacaoDePagamento (1:1)
Pedido.hasOne(TransacaoDePagamento, { foreignKey: 'pedidoIdPedido' });
TransacaoDePagamento.belongsTo(Pedido, { foreignKey: 'pedidoIdPedido' });

// Exportar para uso
export {
  sequelize,
  Cliente,
  Restaurante,
  Pedido,
  Pizza,
  ItemDePedido,
  Bebida,
  BebidaDoPedido,
  Adicional,
  AdicionalDePedido,
  TransacaoDePagamento,
};
