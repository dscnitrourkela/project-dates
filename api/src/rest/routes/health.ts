import express from 'express';
import { healthController } from 'rest/controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthController);
