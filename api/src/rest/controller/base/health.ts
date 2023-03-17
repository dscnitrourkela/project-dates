import { Request, Response } from 'express';

export const healthController = (_: Request, res: Response) =>
  res.json({ health: 'ok', message: 'Hello from Server' });
