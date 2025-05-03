// src/index.ts
import app from './app';
import { sequelize } from './models';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate(); // Valida conexão
    console.log('✅ Conexão com o banco bem-sucedida');

    await sequelize.sync({ alter: true }); // Atualiza modelos no banco
    console.log('✅ Modelos sincronizados com o banco!');

    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error);
  }
}

startServer();
