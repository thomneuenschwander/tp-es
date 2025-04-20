// src/app.ts
import express from 'express';
import { registerRoutes } from './routes';

const app = express();

// Middlewares
app.use(express.json());


// Rotas
registerRoutes(app);


export default app;
