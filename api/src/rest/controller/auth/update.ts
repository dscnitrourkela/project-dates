import { Request, Response } from 'express';
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
      remove,
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
        { upsert: true, runValidators: true, omitUndefined: true, new: true },
      );
    } else if (
      ![undefined, null].includes(orgAdmin) ||
      ![undefined, null].includes(orgEditor) ||
      ![undefined, null].includes(orgViewer)
    ) {
      if (!orgID) return res.status(400).json({ error: 'orgID is required' });
      let updateField;
      if (orgAdmin) updateField = 'orgAdmin';
      else if (orgEditor) updateField = 'orgEditor';
      else if (orgViewer) updateField = 'orgViewer';
      if (remove) {
        permissions = await Permission.findOneAndUpdate(
          { uid },
          { $pull: { [updateField as string]: orgID } },
          { upsert: true, runValidators: true, omitUndefined: true, new: true },
        );
      } else {
        permissions = await Permission.findOneAndUpdate(
          { uid },
          { $push: { [updateField as string]: orgID } },
          { upsert: true, runValidators: true, omitUndefined: true, new: true },
        );
      }
    }
    return res.json({ permissions });
  } catch (error) {
    return res.status(500).send(error);
  }
};
