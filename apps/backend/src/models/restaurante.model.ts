import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional
} from 'sequelize';
import { sequelize } from '../config/database';

export class Restaurante extends Model<
  InferAttributes<Restaurante>,
  InferCreationAttributes<Restaurante>
> {
  declare idRestaurante: CreationOptional<number>;
  declare nome: string;
  declare descricao: string;
  declare latitude: number;
  declare longitude: number;
}

Restaurante.init({
  idRestaurante: {
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
  latitude: {
    type: DataTypes.REAL
  },
  longitude: {
    type: DataTypes.REAL
  }
}, {
  sequelize,
  modelName: 'Restaurante',
  tableName: 'Restaurante',
  timestamps: false
});