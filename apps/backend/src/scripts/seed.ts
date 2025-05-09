import {
  sequelize,
  Cliente,
  Restaurante,
  Pizza,
  Bebida,
  Adicional
} from '../models/index'; // ✅ Importa tudo centralizado via index.ts

export async function seed() {
  try {

    await sequelize.sync({ alter: true });
    console.log('✅ Modelos sincronizados com o banco!');

    // Verifica se as tabelas estão vazias antes de popular
    // 1. Cliente
    const clienteCount = await Cliente.count();
    let cliente;
    if (clienteCount === 0) {
      cliente = await Cliente.create({
        cpf: '12345678901',
        email: 'cliente@example.com',
        senha: 'senha123',
        nome: 'João Silva',
        telefone: '31999999999'
      });
      console.log('✅ Cliente criado');
    } else {
      console.log('ℹ️ Tabela Cliente já populada');
    }

    // 2. Restaurante
    const restauranteCount = await Restaurante.count();
    let restaurante, restauranteAdicional, restauranteAdicional2;
    if (restauranteCount === 0) {
      restaurante = await Restaurante.create({
        nome: 'Pizza App - Savassi',
        descricao: 'R. Cláudio Manoel, 1162 - Savassi, Belo Horizonte - MG',
        latitude: -19.936039,
        longitude: -43.932361
      });
      restauranteAdicional = await Restaurante.create({
        nome: 'Pizza App - Centro',
        descricao: 'Av. Afonso Pena, 1000 - Centro, Belo Horizonte - MG',
        latitude: -19.9191,
        longitude: -43.9383
      });
      restauranteAdicional2 = await Restaurante.create({
        nome: 'Pizza App - Pampulha',
        descricao: 'Av. Otacílio Negrão de Lima, 1000 - Pampulha, Belo Horizonte - MG',
        latitude: -19.8661,
        longitude: -43.9733
      });
      console.log('✅ Restaurantes criados');
    } else {
      console.log('ℹ️ Tabela Restaurante já populada');
    }

    // 3. Pizza
    const pizzaCount = await Pizza.count();
    if (pizzaCount === 0) {
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
      console.log('✅ Pizzas criadas');
    } else {
      console.log('ℹ️ Tabela Pizza já populada');
    }

    // 4. Bebida
    const bebidaCount = await Bebida.count();
    let bebida;
    if (bebidaCount === 0) {
      bebida = await Bebida.create({
        nome: 'Coca-Cola',
        descricao: 'Refrigerante gelado',
        preco: 9.5,
        imagem: 'cocacola.png'
      });
      console.log('✅ Bebida criada');
    } else {
      console.log('ℹ️ Tabela Bebida já populada');
    }

    // 5. Adicional
    const adicionalCount = await Adicional.count();
    let adicional;
    if (adicionalCount === 0) {
      adicional = await Adicional.create({
        nome: 'Borda Recheada',
        descricao: 'Borda com catupiry',
        preco: 5.0
      });
      console.log('✅ Adicional criado');
    } else {
      console.log('ℹ️ Tabela Adicional já populada');
    }

    console.log('✅ Seed concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seed:', error);
  }
}