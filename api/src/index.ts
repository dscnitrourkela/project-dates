import 'dotenv/config';

import { winston } from '@config';
import { PORT } from '@constants';

import express from 'express';

const initApplication = async () => {
  const logger = winston('express');

  const app = express();

  app.listen(PORT, () => logger.info(`server started on port: ${PORT}`));
};

initApplication();
