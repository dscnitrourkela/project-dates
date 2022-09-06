import mongoose from 'mongoose';
import {MONGO_URL} from '../utils/env/index.js';

const connectDb = next => {
  mongoose
    .connect(MONGO_URL)
    .then(() => {
      console.log('connected to database');
      return next();
    })
    .catch(err => {
      console.log('error connecting to database', err);
    });
};

export default connectDb;
