import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Cliente extends Model {}

Cliente.init({
  cpf: { type: DataTypes.CHAR(11), primaryKey: true },
  email: { type: DataTypes.STRING(45) },
  senha: { type: DataTypes.STRING(45) },
  nome: { type: DataTypes.STRING(45) },
  telefone: { type: DataTypes.CHAR(13) }
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'Cliente',
  timestamps: false
});
