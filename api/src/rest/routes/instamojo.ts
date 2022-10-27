import express from 'express';
import {
  generatePaymentLink,
  instaMojowebhook,
} from 'rest/controller';

export const paymentRouter = express.Router();

paymentRouter.post('/instamojo', generatePaymentLink);
paymentRouter.post('/webhook', instaMojowebhook);
