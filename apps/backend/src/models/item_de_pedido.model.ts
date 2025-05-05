import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class ItemDePedido extends Model<
  InferAttributes<ItemDePedido>,
  InferCreationAttributes<ItemDePedido>
> {
  declare idItemPedido: CreationOptional<number>;
  declare quantidade: number;
  declare idPedido: number;
  declare idPizza: number;
}

ItemDePedido.init({
  idItemPedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER
  },
  idPedido: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idPizza: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ItemDePedido',
  tableName: 'Item_de_Pedido',
  timestamps: false
});