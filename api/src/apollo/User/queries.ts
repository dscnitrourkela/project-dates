import { PERMISSIONS } from '@constants';

import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import {
  booleanArg,
  idArg,
  list,
  nonNull,
  objectType,
  queryField,
  stringArg,
} from 'nexus';

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

    const prismaQuery = {
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
