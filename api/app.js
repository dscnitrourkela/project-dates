require("dotenv").config();
const startApolloServer = require("./graphql/server");
const { typeDefs } = require("./graphql/typeDefs");
const { resolvers } = require("./graphql/resolvers");

// Connect to DB
require("./db/mongo");
// Spin the server up
startApolloServer(typeDefs, resolvers);
