import startApolloServer from "./src/graphql/server.js";
import connectDb from "./src/db/mongo.js";

// Connect to database and start Apollo server
connectDb(startApolloServer);
