import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Cliente extends Model<
  InferAttributes<Cliente>,
  InferCreationAttributes<Cliente>
> {
  declare cpf: string;
  declare email: string;
  declare senha: string;
  declare nome: string;
  declare telefone: string;
}

Cliente.init({
  cpf: {
    type: DataTypes.CHAR(11),
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(45)
  },
  senha: {
    type: DataTypes.STRING(45)
  },
  nome: {
    type: DataTypes.STRING(45)
  },
  telefone: {
    type: DataTypes.CHAR(13)
  }
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'Cliente',
  timestamps: false
});