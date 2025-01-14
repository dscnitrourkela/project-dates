import { PERMISSIONS } from '@constants';

import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, nonNull, objectType, queryField, stringArg } from 'nexus';

const PaginatedUserType = objectType({
  name: 'PaginatedUserType',
  description: 'Paginated response for user query',
  definition(t) {
    t.list.field('data', {
      type: 'User',
    });
    t.int('count');
  },
});

export const user = queryField('user', {
  type: PaginatedUserType,
  description: 'Returns a list of users depending upon the parameters passed',
  authorize: (_parent, args, ctx) =>
    args.id || args.uid || args.name || args.orgID
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
    name: stringArg(),
    orgID: idArg(),
    email: stringArg(),
    state: stringArg(),
    city: stringArg(),
    college: stringArg(),
    stream: stringArg(),
    referredBy: stringArg(),
    festID: list(nonNull(stringArg())),
    rollNumber: stringArg(),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, args, { prisma }) {
    const {
      id,
      uid,
      email,
      name,
      state,
      city,
      college,
      stream,
      referredBy,
      rollNumber,
      pagination,
    } = args;

    const prismaQuery = {
      id: id || undefined,
      email: email || undefined,
      uid: uid || undefined,
      name: name || undefined,
      state: state || undefined,
      city: city || undefined,
      college: college || undefined,
      stream: stream || undefined,
      referredBy: referredBy || undefined,
      rollNumber: rollNumber || undefined,
    };

    const [users, count] = await prisma.$transaction([
      prisma.user.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: prismaQuery,
      }),
      prisma.user.count({
        where: prismaQuery,
      }),
    ]);

    return {
      data: users,
      count,
    };
  },
});
