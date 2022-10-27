/* eslint-disable camelcase */
import {
  Request,
  Response,
} from 'express';
import { prisma } from 'utils/context';

export const instaMojowebhook = async (req: Request, res: Response) => {
  const { buyer, payment_id, amount, purpose, status } = req.body;

  if (status === 'Credit') {
    const user = await prisma.user.update({
      where: {
        email: buyer,
      },
      data: {
        festID: {
          push: 'INNOVISION-2022',
        },
      },
    });

    await prisma.transaction.create({
      data: {
        amount,
        userID: user.id,
        transactionID: payment_id,
        type: 'REGISTRATION',
        timestamp: new Date(),
        orgID: '635828887ac60f55b4b3c169',
        comment: purpose,
      },
    });

    return res.send('ok');
  }
  return res.send('Not Credit Type');
};
