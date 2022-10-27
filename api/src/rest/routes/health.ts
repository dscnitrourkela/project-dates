import express from 'express';
import { checkRestPermissions } from 'helpers/auth/checkPermissions';
import {
  createUserController,
  healthController,
} from 'rest/controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthController);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
healthRouter.get('/user', checkRestPermissions(createUserController, []));
