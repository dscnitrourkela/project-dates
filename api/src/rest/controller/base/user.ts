/* eslint-disable consistent-return */
import {
  Request,
  Response,
} from 'express';

import { prisma } from '@utils';

export const createUserController = (req: Request, res: Response) => {
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

    const user = prisma.user.create({
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
    return res.status(400).send('Something went wrong');
  }
};
