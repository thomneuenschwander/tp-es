import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Adicional extends Model {}

Adicional.init({
  idAdicional: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(45) },
  descricao: { type: DataTypes.STRING(100) },
  preco: { type: DataTypes.REAL }
}, {
  sequelize,
  modelName: 'Adicional',
  tableName: 'Adicional',
  timestamps: false
});
