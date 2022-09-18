import { connectDB } from './config/index.js';
import startApolloServer from './graphql/server.js';

/**
 * Connect to the database and start the Apollo Server
 */
connectDB(startApolloServer);
