import connectDb from './config/mongo.js';
import startApolloServer from './graphql/server.js';

// Connect to database and start Apollo server
connectDb(startApolloServer);
