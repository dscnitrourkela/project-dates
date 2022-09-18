import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import http from 'http';

import { logger } from '../config';
import { PORT as port } from '../utils';
import resolvers from './resolvers.js';
import typeDefs from './typeDefs.js';

async function startApolloServer() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      // TODO: Add auth middleware
    },
    csrfPrevention: true,
    mocks: { DateTime: () => new Date() },
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });

  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => {
    httpServer.listen({ port }, resolve);
  });

  logger.info(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
}

export default startApolloServer;
