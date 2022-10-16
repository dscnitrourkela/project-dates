import 'dotenv/config';

import { app } from 'rest/server';

import { initializeApollo } from '@app/server';

initializeApollo(app);
