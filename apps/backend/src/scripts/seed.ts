import {
    sequelize,
    Cliente,
    Restaurante,
    Pedido,
    Pizza,
    ItemDePedido,
    Bebida,
    BebidaDoPedido,
    Adicional,
    AdicionalDePedido,
    TransacaoDePagamento
  } from '../models/index'; // ✅ Importa tudo centralizado via index.ts
  
  async function seed() {
    try {
      await sequelize.sync({ force: true }); // ⚠️ Apaga e recria tabelas
  
      // 1. Cliente
      const cliente = await Cliente.create({
        cpf: '12345678901',
        email: 'cliente@example.com',
        senha: 'senha123',
        nome: 'João Silva',
        telefone: '31999999999'
      });
  
      // 2. Restaurante
      const restaurante = await Restaurante.create({
        nome: 'Pizza App - Savassi',
        descricao: 'R. Cláudio Manoel, 1162 - Savassi, Belo Horizonte - MG',
        latitude: -19.936039,
        longitude: -43.932361
      });

      // 2. Restaurante adicional
      const restauranteAdicional = await Restaurante.create({
        nome: 'Pizza App - Centro',
        descricao: 'Av. Afonso Pena, 1000 - Centro, Belo Horizonte - MG',
        latitude: -19.9191,
        longitude: -43.9383
      });
      
      // 2. Restaurante adicional
      const restauranteAdicional2 = await Restaurante.create({
        nome: 'Pizza App - Pampulha',
        descricao: 'Av. Otacílio Negrão de Lima, 1000 - Pampulha, Belo Horizonte - MG',
        latitude: -19.8661,
        longitude: -43.9733
      });
  
      // 3. Pizza
      const pizza = await Pizza.create({
        nome: 'Calabresa',
        tamanho: 'M',
        preco: 39.9,
        descricao: 'Pizza de calabresa com cebola'
      });
  
      // 4. Bebida
      const bebida = await Bebida.create({
        nome: 'Coca-Cola 2L',
        descricao: 'Refrigerante gelado',
        preco: 9.5
      });
  
      // 5. Adicional
      const adicional = await Adicional.create({
        nome: 'Borda Recheada',
        descricao: 'Borda com catupiry',
        preco: 5.0
      });
  
      // 6. Pedido
      const pedido = await Pedido.create({
        preco: 54.4,
        status: 'Em preparo',
        endereco: 'Rua das Pizzas, 123',
        cpfCliente: cliente.cpf,
        idRestaurante: restaurante.idRestaurante
      });
  
      // 7. Item de Pedido
      await ItemDePedido.create({
        quantidade: 1,
        idPedido: pedido.idPedido,
        idPizza: pizza.idPizza
      });
  
      // 8. Bebida do Pedido
      await BebidaDoPedido.create({
        quantidade: 1,
        idPedido: pedido.idPedido,
        idBebida: bebida.idBebida
      });
  
      // 9. Adicional do Pedido
      await AdicionalDePedido.create({
        quantidade: 1,
        pedidoIdPedido: pedido.idPedido,
        adicionalIdAdicional: adicional.idAdicional
      });
  
      // 10. Transação de Pagamento
      await TransacaoDePagamento.create({
        metodoPagamento: 'Cartão de Crédito',
        numeroCartao: '1234567812345678',
        validadeCartao: '12/28',
        codigoCVC: '123',
        valor: pedido.preco,
        pedidoIdPedido: pedido.idPedido
      });
  
      console.log('✅ Banco populado com sucesso!');
      await sequelize.close();
    } catch (error) {
      console.error('❌ Erro ao popular banco:', error);
    }
  }
  
  seed();