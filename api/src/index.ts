import 'dotenv/config';
import 'nexus_generated/nexus-typegen';

import { app } from 'rest/server';

import { initializeApollo } from '@app/server';

initializeApollo(app);
