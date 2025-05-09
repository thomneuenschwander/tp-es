import express from 'express';
import { registerRoutes } from './routes';
import cors from 'cors';
//roda o script de seed
import { seed } from './scripts/seed';

const app = express();

app.use(cors());

app.use(express.json());

seed();

registerRoutes(app);

export default app;