/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import { checkRestPermissions } from 'helpers/auth/checkPermissions';
import {
    createUserController, getEvents, getTransaction, getUserController, getUserRegistrations,
    healthController, registerUserForEvent, zimbraController
} from 'rest/controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthController);
// @ts-ignore
healthRouter.post('/user', checkRestPermissions(createUserController, []));

healthRouter.get('/zimbra-login', zimbraController);

// @ts-ignore
healthRouter.get('/user', checkRestPermissions(getUserController, []));

// @ts-ignore
healthRouter.get('/events', checkRestPermissions(getEvents, []));

healthRouter.post(
  '/user/registration',
  checkRestPermissions(registerUserForEvent, []),
);

healthRouter.get(
  '/user/registration',
  // @ts-ignore
  checkRestPermissions(getUserRegistrations, []),
);

// @ts-ignore
healthRouter.get('/user/transaction', checkRestPermissions(getTransaction, []));
