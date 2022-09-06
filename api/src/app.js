import startApolloServer from './graphql/server.js';
import connectDb from './db/mongo.js';

// Connect to database and start Apollo server
connectDb(startApolloServer);
