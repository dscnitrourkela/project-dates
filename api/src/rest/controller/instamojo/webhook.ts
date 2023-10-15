/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { prisma } from 'utils/context';

export const instaMojowebhook = async (req: Request, res: Response) => {
  const { buyer, payment_id, amount, purpose, status } = req.body;

  try {
    if (status === 'Credit') {
      const user = await prisma.user.update({
        where: {
          email: buyer,
        },
        data: {
          festID: {
            push: 'innovision-2023',
          },
        },
      });

      await prisma.transaction.create({
        data: {
          amount: parseInt(amount, 10),
          userID: user.id,
          transactionID: payment_id,
          type: 'REGISTRATION',
          timestamp: new Date(),
          orgID: '65133eb72c5708eb84bf53d6',
          comment: purpose,
        },
      });

      return res.status(200).send('ok');
    }

    return res.send(400).send('Not Credit Type');
  } catch (error) {
    return res.status(500).send(error);
  }
};
