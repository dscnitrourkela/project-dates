import express from 'express';
import { checkRestPermissions } from 'helpers/auth/checkPermissions';
import {
    createUserController, getUserController, healthController, zimbraController
} from 'rest/controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthController);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
healthRouter.post('/user', checkRestPermissions(createUserController, []));

healthRouter.get('/zimbra-login', zimbraController);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
healthRouter.get('/user', checkRestPermissions(getUserController, []));
