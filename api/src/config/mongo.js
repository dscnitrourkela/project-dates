import mongoose from 'mongoose';

import {MONGO_URL} from '../utils/env/index.js';
import logger from './winston.js';

const connectDb = (next) => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      logger.info('connected to database');
      return next();
    })
    .catch((err) => {
      logger.error('error connecting to database', err);
    });
};

export default connectDb;
