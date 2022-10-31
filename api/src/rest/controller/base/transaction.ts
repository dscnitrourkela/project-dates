import { prisma } from '@utils';

import { Request, Response } from 'express';

type Empty = Record<string, unknown>;

export const getTransaction = (
  req: Request<Empty, Empty, Empty, { userID: string; orgID: string }>,
  res: Response,
) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).send('userID is a required parameter');
    }

    const transaction = prisma.transaction.findMany({
      where: {
        userID,
      },
    });

    return res.status(200).send(transaction);
  } catch (error) {
    return res.status(500).send('internal server error');
  }
};
