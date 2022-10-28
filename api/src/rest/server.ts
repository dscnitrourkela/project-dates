import cors from 'cors';
import express from 'express';

import { mongoAuthDb } from '@config';
import { ALLOWED_CLIENT_URL } from '@constants';

import {
  healthRouter,
  paymentRouter,
} from './routes';
import { authRouter } from './routes/auth';

export const app = express();

const corsOptions = {
  origin(origin: any, callback: any) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (ALLOWED_CLIENT_URL.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', healthRouter);

app.use('/auth', authRouter);

app.use('/payment', paymentRouter);

mongoAuthDb();
