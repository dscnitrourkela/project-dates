import express from 'express';
import {
  createUserController,
  healthController,
} from 'rest/controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthController);
healthRouter.post('/user', createUserController);
