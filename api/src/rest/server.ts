import express from 'express';

import { healthRouter } from './routes';

export const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', healthRouter);

app.use('/auth', healthRouter);
