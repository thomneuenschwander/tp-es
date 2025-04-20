// src/app.ts
import express from 'express';
//import userRoutes from './routes/user.routes'; // Exemplo de rota

const app = express();

// Middlewares
app.use(express.json());

// Rotas
//app.use('/users', userRoutes); // Exemplo: localhost:3000/users

export default app;
