import axios from 'axios';
import { Request, Response } from 'express';

export const zimbraController = async (req: Request, res: Response) => {
  const { username, password } = req.query;
  if (!username || !password)
    return res.status(400).send('Missing username or password');
  try {
    await axios.get('https://mail.nitrkl.ac.in/home/~/?auth=sc', {
      auth: {
        username: `${username}@nitrkl.ac.in`,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        password,
      },
    });
    return res.status(401).send('invalid credentials');
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const cookie = error?.response.headers['set-cookie'];
    if (cookie) return res.status(200).send('success');
    return res.status(401).send('invalid credentials');
  }
};
