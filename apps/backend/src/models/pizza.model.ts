import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/database';

export class Pizza extends Model {}

Pizza.init({
  idPizza: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING(45) },
  tamanho: { type: DataTypes.CHAR(2) },
  preco: { type: DataTypes.REAL },
  descricao: { type: DataTypes.STRING(100) }
}, {
  sequelize,
  modelName: 'Pizza',
  tableName: 'Pizza',
  timestamps: false
});
