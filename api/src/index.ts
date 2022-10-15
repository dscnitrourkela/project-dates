import 'dotenv/config';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { schema, winston } from '@config';
import { PORT } from '@constants';

import cors from 'cors';
import express from 'express';
import http from 'http';

interface MyContext {
  token?: string;
}

const initialize = async () => {
  const logger = winston('express');
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer<MyContext>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  httpServer.listen(PORT, () => logger.info(`server started on port: ${PORT}`));
};

initialize();
