import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Pedido extends Model<InferAttributes<Pedido>, InferCreationAttributes<Pedido>> {
  declare idPedido: CreationOptional<number>;
  declare preco: number;
  declare status: string;
  declare endereco: string;
  declare cpfCliente: string;
  declare idRestaurante: number;
}

Pedido.init({
  idPedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  preco: {
    type: DataTypes.REAL
  },
  status: {
    type: DataTypes.STRING(20)
  },
  endereco: {
    type: DataTypes.STRING(100)
  },
  cpfCliente: {
    type: DataTypes.CHAR(11),
    allowNull: false
  },
  idRestaurante: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Pedido',
  tableName: 'Pedido',
  timestamps: false
});