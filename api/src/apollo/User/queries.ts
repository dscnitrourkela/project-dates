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
    args.id || args.uid || args.email
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
    college: stringArg(),
    aicheRegID: stringArg(),
    mobile: stringArg(),
    srcID: stringArg(),
    festID: list(nonNull(stringArg())),
    isNitrStudent: booleanArg({ default: true }),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, args, { prisma }) {
    const {
      id,
      uid,
      email,
      college,
      mobile,
      festID,
      isNitrStudent,
      pagination,
    } = args;

    const prismaQuery = {
      id: id || undefined,
      email: email || undefined,
      uid: uid || undefined,
      mobile: mobile || undefined,
      college: college || undefined,
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

export const getUser = queryField('getUser', {
  type: 'User',
  description: 'Fetches a user by ID, email, or UID',
  args: {
    id: idArg(),
    email: stringArg(),
    uid: stringArg(),
  },
  authorize: (_parent, _args, _ctx) => true,
  // authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  async resolve(_parent, args, { prisma }) {
    if (!args.email && !args.uid) {
      throw new Error(
        'You must provide either an ID, an email, or a UID to fetch the user.',
      );
    }

    return prisma.user.findUnique({
      where: {
        id: args.id ?? undefined,
        email: args.email ?? undefined,
        uid: args.uid ?? undefined,
      },
    });
  },
});
