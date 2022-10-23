import {
  model,
  Schema,
} from 'mongoose';

interface IPermission {
  uid: string;
  umid: string;
  superAdmin: boolean;
  superEditor: boolean;
  superViewer: boolean;
  orgAdmin: string[];
  orgEditor: string[];
  orgViewer: string[];
}

/*
This is an Independent permission collections
1. uid: user id
2. umid: user mongo id
3. super[Admin/Editor/Viewer]: To check if user has super access.
4. org[Admin/Editor/Viewer]: List of org IDs, to check if user has access to specific org.
*/
const permissionSchema = new Schema<IPermission>(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    umid: {
      type: String,
      required: true,
      unique: true,
    },
    superAdmin: {
      type: Boolean,
      default: false,
    },
    superEditor: {
      type: Boolean,
      default: false,
    },
    superViewer: {
      type: Boolean,
      default: false,
    },
    orgAdmin: {
      type: [String],
      default: [],
    },
    orgEditor: {
      type: [String],
      default: [],
    },
    orgViewer: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true },
);

export const Permission = model<IPermission>('Permission', permissionSchema);
