import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Adicional extends Model<
  InferAttributes<Adicional>,
  InferCreationAttributes<Adicional>
> {
  declare idAdicional: CreationOptional<number>;
  declare nome: string;
  declare descricao: string;
  declare preco: number;
}

Adicional.init({
  idAdicional: {
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
  modelName: 'Adicional',
  tableName: 'Adicional',
  timestamps: false
});
