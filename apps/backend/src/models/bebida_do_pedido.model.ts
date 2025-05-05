import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class BebidaDoPedido extends Model<
  InferAttributes<BebidaDoPedido>,
  InferCreationAttributes<BebidaDoPedido>
> {
  declare idBebidaPedido: CreationOptional<number>;
  declare quantidade: number;
  declare idBebida: number;
  declare idPedido: number;
}

BebidaDoPedido.init({
  idBebidaPedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER
  },
  idBebida: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'BebidaDoPedido',
  tableName: 'Bebida_do_Pedido',
  timestamps: false
});