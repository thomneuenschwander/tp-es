import 'dotenv/config';
import express from 'express';
import { registerRoutes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL!,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

registerRoutes(app);

export default app;