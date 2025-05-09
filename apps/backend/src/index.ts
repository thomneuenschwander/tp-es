import app from './app';
import { sequelize } from './config/database';

const PORT = process.env.PORT || 5000;

async function startServer() {
  console.log('Iniciando servidor...');
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco bem-sucedida');

    await app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Erro ao conectar com o banco:', error);
    process.exit(1); 
  }
}

startServer();