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

// Seed para adicionar dois adicionais iniciais
async function seedAdicionais() {
  try {
    const count = await Adicional.count();
    if (count === 0) {
      await Adicional.bulkCreate([
        {
          nome: 'Queijo Extra',
          descricao: 'Adicional de queijo extra na pizza',
          preco: 5.00
        },
        {
          nome: 'Azeitonas',
          descricao: 'Adicional de azeitonas pretas',
          preco: 3.50
        }
      ]);
      console.log('Adicionais adicionados com sucesso!');
    } else {
      console.log('Os adicionais já foram inseridos anteriormente.');
    }
  } catch (error) {
    console.error('Erro ao inserir adicionais:', error);
  }
}

// Chama a função de seed após a definição do modelo
seedAdicionais();
