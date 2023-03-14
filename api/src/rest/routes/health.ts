/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import { checkRestPermissions } from 'helpers/auth/checkPermissions';
import {
  createEvent,
  createUserController,
  getEvents,
  getTransaction,
  getUserController,
  getUserRegistrations,
  healthController,
  registerUserForEvent,
  zimbraController,
} from 'rest/controller';

export const healthRouter = express.Router();

healthRouter.get('/', healthController);

healthRouter.get('/zimbra-login', zimbraController);

healthRouter.get('/user', checkRestPermissions(getUserController, []));

healthRouter.post('/user', checkRestPermissions(createUserController, []));

healthRouter.get(
  '/user/registration',
  // @ts-ignore
  checkRestPermissions(getUserRegistrations, []),
);

healthRouter.post(
  '/user/registration',
  checkRestPermissions(registerUserForEvent, []),
);

// @ts-ignore
healthRouter.get('/user/transaction', checkRestPermissions(getTransaction, []));

healthRouter.get('/events', getEvents);

healthRouter.post('/events/create', checkRestPermissions(createEvent, []));
