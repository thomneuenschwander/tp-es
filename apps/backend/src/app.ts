import express from 'express';
import { registerRoutes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

registerRoutes(app);

export default app;