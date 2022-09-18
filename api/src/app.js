import connectDb from './config/mongo.js';
import startApolloServer from './graphql/server.js';

/**
 * Connect to the database and start the Apollo Server
 */
connectDb(startApolloServer);
