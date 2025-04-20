import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Restaurante extends Model {}

Restaurante.init({
  idRestaurante: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(45) },
  descricao: { type: DataTypes.STRING(100) },
  latitude: { type: DataTypes.REAL },
  longitude: { type: DataTypes.REAL }
}, {
  sequelize,
  modelName: 'Restaurante',
  tableName: 'Restaurante',
  timestamps: false
});
