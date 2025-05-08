import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../config/database';

export class TransacaoDePagamento extends Model<
  InferAttributes<TransacaoDePagamento>,
  InferCreationAttributes<TransacaoDePagamento>
> {
  declare idTransacaoPagamento: CreationOptional<number>;
  declare stripeSessionId: string;
  declare valor: number;
  declare pedidoIdPedido: number;
}

TransacaoDePagamento.init({
  idTransacaoPagamento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  stripeSessionId: {
    type: DataTypes.STRING()
  },
  valor: {
    type: DataTypes.REAL
  },
  pedidoIdPedido: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'TransacaoDePagamento',
  tableName: 'Transação_de_Pagamento',
  timestamps: false
});
