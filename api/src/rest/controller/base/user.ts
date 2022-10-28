import { prisma } from '@utils';

/* eslint-disable consistent-return */
import { Request, Response } from 'express';

export const createUserController = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      gender,
      dob,
      state,
      city,
      college,
      stream,
      mobile,
      referredBy,
      rollNumber,
      uid,
    } = req.body;

    if (!email || !uid) {
      return res
        .status(403)
        .send('Missing Paramenters: email and UID are required parameters');
    }

    const user = await prisma.user.create({
      data: {
        email,
        uid,
        name,
        photo: '',
        gender,
        dob,
        state,
        city,
        college,
        stream,
        mobile,
        referredBy,
        rollNumber,
      },
    });

    return res.status(200).send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};
