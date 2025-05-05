import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Pedido extends Model {
  public idPedido!: number;
  public valorTotal!: number;
  public status!: string;
  public endereco!: string;
  public cpfCliente!: string;
  public idRestaurante!: number;
  public data!: Date;
}

Pedido.init(
  {
    idPedido: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    valorTotal: {
      type: DataTypes.DECIMAL(10, 2), // Alterado de REAL para DECIMAL
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: false,
      defaultValue: 'pending',
    },
    endereco: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    cpfCliente: {
      type: DataTypes.CHAR(11),
      allowNull: false,
    },
    idRestaurante: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: 'Pedido',
    tableName: 'Pedido',
    timestamps: false,
  }
);