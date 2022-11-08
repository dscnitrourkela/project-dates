import express from 'express';
import { checkRestPermissions } from 'helpers/auth/checkPermissions';
import { generatePaymentLink, instaMojowebhook } from 'rest/controller';

export const paymentRouter = express.Router();

paymentRouter.post('/instamojo', checkRestPermissions(generatePaymentLink, []));
paymentRouter.post('/webhook', instaMojowebhook);
