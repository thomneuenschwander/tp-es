import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../config/database';

export class Bebida extends Model<
  InferAttributes<Bebida>,
  InferCreationAttributes<Bebida>
> {
  declare idBebida: CreationOptional<number>;
  declare nome: string;
  declare descricao: string;
  declare preco: number;
}

Bebida.init({
  idBebida: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(45)
  },
  descricao: {
    type: DataTypes.STRING(100)
  },
  preco: {
    type: DataTypes.REAL
  }
}, {
  sequelize,
  modelName: 'Bebida',
  tableName: 'Bebida',
  timestamps: false
});