import {
  Request,
  Response,
} from 'express';

export const instaMojowebhook = async (req: Request, res: Response) => {
  console.log(req.body);
  res.send('ok');
};
