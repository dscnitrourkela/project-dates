import {
  Request,
  Response,
} from 'express';
import { verifyUser } from 'helpers';
import { Permission } from 'rest/model';

export const getUserAuth = async (req: Request, res: Response) => {
  if (req.query && req.query.token) {
    try {
      const decodedToken = await verifyUser(req.query.token as string);
      if (decodedToken) {
        const permissions = await Permission.findOne({ uid: decodedToken.uid });
        return res.json({
          authenticated: true,
          user: decodedToken,
          permissions,
        });
      }
    } catch (error) {
      return res.status(401).json({ authenticated: false, error });
    }
  }
  return res.status(401).json({ authenticated: false, user: null });
};
