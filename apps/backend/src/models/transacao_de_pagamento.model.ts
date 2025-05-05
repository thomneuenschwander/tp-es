import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class TransacaoDePagamento extends Model {
  public idTransacaoPagamento!: number;
  public metodoPagamento!: string;
  public numeroCartao?: string;
  public validadeCartao?: string;
  public codigoCVC?: string;
  public valor!: number;
  public pedidoIdPedido!: number;
  public status!: string;
  public stripeSessionId?: string;
  public data!: Date;
}

TransacaoDePagamento.init(
  {
    idTransacaoPagamento: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    metodoPagamento: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    numeroCartao: {
      type: DataTypes.CHAR(16),
      allowNull: true,
    },
    validadeCartao: {
      type: DataTypes.CHAR(5),
      allowNull: true,
    },
    codigoCVC: {
      type: DataTypes.CHAR(3),
      allowNull: true,
    },
    valor: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    pedidoIdPedido: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    stripeSessionId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'TransacaoDePagamento',
    tableName: 'Transação_de_Pagamento',
    timestamps: false,
  }
);