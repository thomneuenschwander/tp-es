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
  declare metodoPagamento: string;
  declare numeroCartao: string;
  declare validadeCartao: string;
  declare codigoCVC: string;
  declare valor: number;
  declare pedidoIdPedido: number;
}

TransacaoDePagamento.init({
  idTransacaoPagamento: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  metodoPagamento: {
    type: DataTypes.STRING(45)
  },
  numeroCartao: {
    type: DataTypes.CHAR(16)
  },
  validadeCartao: {
    type: DataTypes.CHAR(5)
  },
  codigoCVC: {
    type: DataTypes.CHAR(3)
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