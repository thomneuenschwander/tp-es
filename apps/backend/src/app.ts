import express from 'express';
import { registerRoutes } from './routes';
import cors from 'cors';
//roda o script de seed
import { seed } from './scripts/seed';

const app = express();

app.use(cors());

seed();

app.use(express.json());

registerRoutes(app);

export default app;