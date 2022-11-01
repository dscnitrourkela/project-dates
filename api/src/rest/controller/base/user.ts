import { prisma } from '@utils';

/* eslint-disable consistent-return */
import { Request, Response } from 'express';

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res
        .status(400)
        .send('Missing Parameter: uid is a required parameter');
    }

    const user = await prisma.user.findUnique({
      where: {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        uid,
      },
    });

    if (!user) {
      return res.status(200).send(null);
    }

    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }
};

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
        .send('Missing Parameters: email and UID are required parameters');
    }

    if (email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        return res.status(400).send('User with this email already registered');
      }
    }

    if (rollNumber) {
      const users = await prisma.user.findMany({
        where: {
          rollNumber,
        },
      });

      if (users.length > 0) {
        return res
          .status(400)
          .send('User with this roll number already registered');
      }
    }

    if (mobile) {
      const user = await prisma.user.findUnique({
        where: {
          mobile,
        },
      });

      if (user) {
        return res.status(400).send('User with this mobile already registered');
      }
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
        selfID: mobile,
        festID: rollNumber ? ['innovision-2022'] : [],
      },
    });

    return res.status(200).send(user);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(400).send('Internal Server Error');
  }
};
