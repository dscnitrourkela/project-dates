import express from 'express';
import { checkRestPermissions } from 'helpers/auth/checkPermissions';
import {
  getUserAuth,
  updatePermissions,
} from 'rest/controller';

import { PERMISSIONS } from '@constants';

export const authRouter = express.Router();

authRouter.get('/', getUserAuth);
authRouter.post(
  '/',
  checkRestPermissions(updatePermissions, [PERMISSIONS.SUPER_ADMIN]),
);
