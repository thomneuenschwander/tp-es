// src/app.ts
import express from 'express';
import { registerRoutes } from './routes';
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middlewares
app.use(express.json());


// Rotas
registerRoutes(app);


export default app;
