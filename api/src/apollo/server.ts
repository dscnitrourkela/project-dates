import cors from 'cors';
import { Application } from 'express';
import http from 'http';

import { ApolloServer } from '@apollo/server';
import {
  ApolloServerPluginDrainHttpServer,
} from '@apollo/server/plugin/drainHttpServer';
import {
  schema,
  winston,
} from '@config';
import { PORT } from '@constants';
import { Context } from '@utils';

export const initializeApollo = async (app: Application) => {
  const logger = winston('server');

  const httpServer = http.createServer(app);

  const whitelist = process.env.ALLOWED_CLIENT_URL;

  const corsOptions = {
    origin(origin: any, callback: any) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

  app.use(cors(corsOptions));

  app.use(cors);

  const server = new ApolloServer<Context>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();

  // app.use(
  //   '/graphql',
  //   expressMiddleware(server, {
  //     context,
  //   }),
  // );

  httpServer.listen(PORT, () =>
    logger.info(`server started at: http://localhost:${PORT}`),
  );
};
