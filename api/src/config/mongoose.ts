import { connect } from 'mongoose';

import { MONGO_AUTH_DB } from '@constants';

import { winston } from './winston';

export const mongoAuthDb = async () => {
  const logger = winston('authDb');
  try {
    await connect(MONGO_AUTH_DB as string);
    logger.info('connected to auth db');
  } catch (error) {
    logger.error(error);
  }
};
