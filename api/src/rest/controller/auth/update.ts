import {
  Request,
  Response,
} from 'express';
import { Permission } from 'rest/model';

export const updatePermissions = async (req: Request, res: Response) => {
  try {
    const {
      uid,
      superAdmin,
      superEditor,
      superViewer,
      orgAdmin,
      orgEditor,
      orgViewer,
      orgID,
    } = req.body;
    let permissions;
    if (!uid) return res.status(400).json({ error: 'uid is required' });
    if (
      ![undefined, null].includes(superAdmin) ||
      ![undefined, null].includes(superEditor) ||
      ![undefined, null].includes(superViewer)
    ) {
      permissions = await Permission.findOneAndUpdate(
        { uid },
        { superAdmin, superEditor, superViewer },
        { upsert: true },
      );
    } else if (
      ![undefined, null].includes(orgAdmin) ||
      ![undefined, null].includes(orgEditor) ||
      ![undefined, null].includes(orgViewer)
    ) {
      if (!orgID) return res.status(400).json({ error: 'orgID is required' });
      if (orgAdmin) {
        permissions = await Permission.findOneAndUpdate(
          { uid },
          { $push: { orgAdmin: orgID } },
          { upsert: true, runValidators: true, omitUndefined: true, new: true },
        );
      } else if (orgEditor) {
        permissions = await Permission.findOneAndUpdate(
          { uid },
          { $push: { orgEditor: orgID } },
          { upsert: true, runValidators: true, omitUndefined: true, new: true },
        );
      } else if (orgViewer) {
        permissions = await Permission.findOneAndUpdate(
          { uid },
          { $push: { orgViewer: orgID } },
          { upsert: true, runValidators: true, omitUndefined: true, new: true },
        );
      } else {
        return res.status(400).json({ error: 'Missing required arguments' });
      }
    } else {
      return res.status(400).json({ error: 'Missing required arguments' });
    }
    return res.json({ permissions });
  } catch (error) {
    return res.status(500).send(error);
  }
};
