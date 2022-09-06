import * as dotenv from 'dotenv';

dotenv.config();

export const {MONGO_URL, PORT} = process.env;
