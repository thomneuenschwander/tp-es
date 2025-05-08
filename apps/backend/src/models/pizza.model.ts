import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import { sequelize } from '../config/database';

export class Pizza extends Model<
  InferAttributes<Pizza>,
  InferCreationAttributes<Pizza>
> {
  declare idPizza: CreationOptional<number>;
  declare nome: string;
  declare preco: number;
  declare descricao: string;
  declare slug: string;
}

Pizza.init({
  idPizza: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nome: {
    type: DataTypes.STRING(45)
  },
  slug: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  preco: {
    type: DataTypes.REAL
  },
  descricao: {
    type: DataTypes.STRING(100)
  }
}, {
  sequelize,
  modelName: 'Pizza',
  tableName: 'Pizza',
  timestamps: false
});

async function seedPizzas() {
  try {
    const count = await Pizza.count();
    if (count === 0) {
      await Pizza.bulkCreate([
        {
          nome: 'Margherita',
          slug: 'margherita',
          preco: 3.50,
          descricao: 'Pizza de molho de tomate, queijo e manjericão',
        },
        {
          nome: 'Pepperoni',
          slug: 'pepperoni',
          preco: 5.00,
          descricao: 'Pizza de pepperoni com molho de tomate caseiro',
        }
      ]);
      console.log('Pizzas adicionadas com sucesso!');
    } else {
      console.log('As pizzas já foram inseridas anteriormente.');
    }
  } catch (error) {
    console.error('Erro ao inserir pizzas:', error);
  }
}

seedPizzas();
