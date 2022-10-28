import axios from 'axios';
import { Request, Response } from 'express';

export const zimbraController = async (req: Request, res: Response) => {
  const { username, password } = req.query;

  try {
    const { status } = await axios.get(
      'https://mail.nitrkl.ac.in/home/~/?auth=ba',
      {
        auth: {
          username: `${username}@nitrkl.ac.in`,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          password,
        },
      },
    );

    if (status === 401) {
      res.status(200).send('success');
    } else {
      res.status(401).send('invalid credentials');
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
