import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  cpf: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: 'Token não fornecido' });
    return;
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET!);
    const { cpf } = data as TokenPayload;

    req.cpf = cpf;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}; 