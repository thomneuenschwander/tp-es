import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class BebidaDoPedido extends Model {}

BebidaDoPedido.init({
  idBebidaPedido: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantidade: { type: DataTypes.INTEGER },
  idBebida: { type: DataTypes.INTEGER, allowNull: false },
  idPedido: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'BebidaDoPedido',
  tableName: 'Bebida_do_Pedido',
  timestamps: false
});
