import dotenv from 'dotenv';
dotenv.config({ path: '../.env' }); // ajuste se necessário

import { sequelize } from '../config/database';
import { Cliente, Pizza, Bebida, Restaurante, Adicional } from '../models';

async function seed() {
  try {
    console.log('🔍 Sequelize env vars:', {
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
      DB_HOST: process.env.DB_HOST,
    });

    await sequelize.authenticate();
    console.log('✅ Conectado com sucesso');

    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados');

    await Cliente.create({
      cpf: '11122233344',
      nome: 'Usuário Teste',
      email: 'teste@example.com',
      senha: 'senha123',
      telefone: '31999999999',
    });

    console.log('✅ Cliente criado com sucesso!');

    await Pizza.bulkCreate([
      {
        nome: 'Margherita',
        slug: 'margherita',
        tamanho: 'M',
        preco: 30,
        descricao: 'Molho de tomate, muçarela e manjericão.'
      },
      {
        nome: 'Pepperoni',
        slug: 'pepperoni',
        tamanho: 'M',
        preco: 36,
        descricao: 'Pepperoni crocante sobre queijo derretido.'
      },
      {
        nome: 'Vegetariana',
        slug: 'vegetarian',
        tamanho: 'M',
        preco: 34,
        descricao: 'Mix de legumes frescos com muçarela.'
      }
    ]);

    console.log('✅ Pizzas criadas com sucesso!');

    await Bebida.bulkCreate([
      {
        nome: 'Coca-Cola',
        descricao: 'Refrigerante 350ml',
        preco: 5.0,
        imagem: '/images/coca.png'
      },
      {
        nome: 'Suco de Laranja',
        descricao: 'Suco natural gelado',
        preco: 7.0,
        imagem: '/images/orange_juice.png'
      },
      {
        nome: 'Água Mineral',
        descricao: 'Sem gás, 500ml',
        preco: 3.5,
        imagem: '/images/water.png'
      }
    ]);
    

    console.log('✅ Bebidas criadas com sucesso!');

    await Restaurante.create({
      nome: 'Pizza Master',
      descricao: 'A melhor pizzaria da cidade',
      latitude: -19.9245,
      longitude: -43.9352
    })    
    
    console.log('✅ Restaurante criado com sucesso!')

    await Adicional.bulkCreate([
      {
        nome: 'Borda Recheada',
        descricao: 'Borda de queijo catupiry',
        preco: 6.0
      },
      {
        nome: 'Extra Bacon',
        descricao: 'Adicional de bacon crocante',
        preco: 4.0
      },
      {
        nome: 'Molho Especial',
        descricao: 'Molho de alho artesanal',
        preco: 3.0
      },
      {
        nome: 'Azeitonas Pretas',
        descricao: 'Azeitonas selecionadas',
        preco: 2.5
      }
    ]);    

    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao popular banco:', error);
    process.exit(1);
  }
}

seed();
