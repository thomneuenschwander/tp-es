import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Pedido extends Model {}

Pedido.init({
  idPedido: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  preco: { type: DataTypes.REAL },
  status: { type: DataTypes.STRING(20) },
  endereco: { type: DataTypes.STRING(100) },
  cpfCliente: { type: DataTypes.CHAR(11), allowNull: false },
  idRestaurante: { type: DataTypes.INTEGER, allowNull: false }
}, {
  sequelize,
  modelName: 'Pedido',
  tableName: 'Pedido',
  timestamps: false
});
