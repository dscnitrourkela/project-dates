import express from 'express';

import { mongoAuthDb } from '@config';

import { healthRouter } from './routes';
import { authRouter } from './routes/auth';

export const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', healthRouter);

app.use('/auth', authRouter);

mongoAuthDb();
