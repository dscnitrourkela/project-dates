import { Application } from 'express';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import {
  ApolloServerPluginDrainHttpServer,
} from '@apollo/server/plugin/drainHttpServer';
import {
  schema,
  winston,
} from '@config';
import { PORT } from '@constants';
import {
  context,
  Context,
} from '@utils';

export const initializeApollo = async (app: Application) => {
  const logger = winston('server');

  const httpServer = http.createServer(app);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  app.use(
    '/graphql',
    expressMiddleware(server, {
      context,
    }),
  );

  httpServer.listen(PORT, () =>
    logger.info(`server started at: http://localhost:${PORT}`),
  );
};
