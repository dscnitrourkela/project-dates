import { PERMISSIONS } from '@constants';
import { Context } from '@utils';

import { Request, Response } from 'express';
import { Permission as PermissionModel } from 'rest/model';

import { verifyUser } from './verify';

export const ERRORS = {
  UNAUTHORIZED: {
    message: 'Unauthorized: Token not found',
    code: 401,
  },
  FORBIDDEN: {
    message: 'Permission Denied',
    code: 403,
  },
  BAD_REQUEST: {
    message: 'Bad Request',
    code: 400,
  },
  INTERNAL_SERVER: {
    message: 'Internal Server Error',
    code: 500,
  },
};

export class CustomError extends Error {
  code = 0;

  constructor(props: { code: number; message: string }) {
    super(props.message);
    this.code = props.code;
  }
}

export type CustomNextFunction = (
  req: Request,
  res: Response,
) => Promise<Response<unknown, Record<string, unknown>>>;

// eslint-disable-next-line no-shadow
export enum API_TYPE {
  GRAPHQL = 'graphql',
  REST = 'rest',
}

export type ErrorParam = {
  message: string;
  code: number;
};

export const restErrorHandler = (res: Response) => (error: ErrorParam) =>
  res.status(error.code).send(error.message);

export const gqlErrorHandler = (error: ErrorParam) => new CustomError(error);

export type CheckPermissionsType = {
  req: Request;
  successHandler:
    | (() => Promise<Response<unknown, Record<string, unknown>>>)
    | (() => boolean);
  errorHandler: (
    error: ErrorParam,
  ) => Response<unknown, Record<string, unknown>> | Error;
  requiredPermissions?: [PERMISSIONS?];
  id?: string;
};

const checkPermissions = async ({
  req,
  successHandler,
  errorHandler,
  requiredPermissions,
  id,
}: CheckPermissionsType) => {
  if (!req.headers || !req.headers.authorization) {
    return errorHandler(ERRORS.UNAUTHORIZED);
  }

  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return errorHandler(ERRORS.FORBIDDEN);
  }

  try {
    const decodedToken = await verifyUser(token);
    if (!decodedToken) {
      return errorHandler(ERRORS.FORBIDDEN);
    }

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return successHandler();
    }

    const permissions = await PermissionModel.findOne({
      uid: decodedToken.uid,
    });

    if (!permissions) {
      return errorHandler(ERRORS.FORBIDDEN);
    }

    for (let i = 0; i < requiredPermissions.length; i += 1) {
      const permission = requiredPermissions[i];
      if (
        (permission === PERMISSIONS.SUPER_ADMIN && permissions.superAdmin) ||
        (permission === PERMISSIONS.SUPER_EDITOR && permissions.superEditor) ||
        (permission === PERMISSIONS.SUPER_VIEWER && permissions.superViewer)
      ) {
        return successHandler();
      }

      if (
        (permission === PERMISSIONS.ORG_ADMIN &&
          permissions.orgAdmin.length > 0 &&
          id &&
          permissions.orgAdmin.includes(id)) ||
        (permission === PERMISSIONS.ORG_EDITOR &&
          permissions.orgEditor.length > 0 &&
          id &&
          permissions.orgEditor.includes(id)) ||
        (permission === PERMISSIONS.SUPER_VIEWER &&
          permissions.orgViewer.length > 0 &&
          id &&
          permissions.orgViewer.includes(id))
      ) {
        return successHandler();
      }
    }

    return errorHandler(ERRORS.FORBIDDEN);
  } catch (error) {
    return errorHandler(ERRORS.FORBIDDEN);
  }
};

export const checkRestPermissions =
  (
    next: CustomNextFunction,
    requiredPermissions?: [PERMISSIONS?],
    id?: string,
  ) =>
  async (req: Request, res: Response) => {
    const successHandler = () => next(req, res);
    const errorHandler = restErrorHandler(res);

    return checkPermissions({
      req,
      successHandler,
      errorHandler,
      requiredPermissions,
      id,
    });
  };

export const checkGqlPermissions = (
  context: Context,
  requiredPermissions?: [PERMISSIONS?],
  id?: string,
): Promise<boolean | Error> => {
  const successHandler = () => true;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return checkPermissions({
    req: context.req,
    successHandler,
    errorHandler: gqlErrorHandler,
    requiredPermissions,
    id,
  });
};
