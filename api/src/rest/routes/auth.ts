import express from 'express';
import {
  getUserAuth,
  updatePermissions,
} from 'rest/controller';

export const authRouter = express.Router();

authRouter.get('/', getUserAuth);
authRouter.post('/', updatePermissions);
