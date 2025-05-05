import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class AdicionalDePedido extends Model<
  InferAttributes<AdicionalDePedido>,
  InferCreationAttributes<AdicionalDePedido>
> {
  declare idAdicionalPedido: CreationOptional<number>;
  declare quantidade: number;
  declare adicionalIdAdicional: number;
  declare pedidoIdPedido: number;
}

AdicionalDePedido.init({
  idAdicionalPedido: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quantidade: {
    type: DataTypes.INTEGER
  },
  adicionalIdAdicional: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pedidoIdPedido: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'AdicionalDePedido',
  tableName: 'Adicional_de_Pedido',
  timestamps: false
});