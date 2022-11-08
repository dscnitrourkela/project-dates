import { PERMISSIONS } from '@constants';

import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { booleanArg, idArg, list, nonNull, queryField, stringArg } from 'nexus';

export const user = queryField('user', {
  type: list('User'),
  description: 'Returns a list of users depending upon the parameters passed',
  authorize: (_parent, args, ctx) =>
    args.id || args.uid
      ? checkGqlPermissions(ctx, [])
      : checkGqlPermissions(
          ctx,
          [
            PERMISSIONS.SUPER_ADMIN,
            PERMISSIONS.SUPER_EDITOR,
            PERMISSIONS.SUPER_VIEWER,
            PERMISSIONS.ORG_ADMIN,
            PERMISSIONS.ORG_EDITOR,
            PERMISSIONS.ORG_VIEWER,
          ],
          args.orgID || undefined,
        ),
  args: {
    id: idArg(),
    uid: idArg(),
    orgID: idArg(),
    email: stringArg(),
    state: stringArg(),
    city: stringArg(),
    college: stringArg(),
    stream: stringArg(),
    referredBy: stringArg(),
    festID: list(nonNull(stringArg())),
    isNitrStudent: booleanArg({ default: true }),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, args, { prisma }) {
    const {
      id,
      uid,
      email,
      state,
      city,
      college,
      stream,
      referredBy,
      festID,
      isNitrStudent,
      pagination,
    } = args;

    return prisma.user.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: {
        id: id || undefined,
        email: email || undefined,
        uid: uid || undefined,
        state: state || undefined,
        city: city || undefined,
        college: college || undefined,
        stream: stream || undefined,
        referredBy: referredBy || undefined,
        rollNumber: !isNitrStudent ? null : undefined,
        festID: {
          hasEvery: festID || [],
        },
      },
    });
  },
});
