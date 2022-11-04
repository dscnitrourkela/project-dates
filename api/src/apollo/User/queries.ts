import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { booleanArg, idArg, inputObjectType, list, nonNull, queryField, stringArg } from 'nexus';

export const getUser = queryField('getUser', {
  type: 'User',
  description: 'Returns a user whose id or email is passed',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    uid: idArg(),
    email: stringArg(),
  },
  resolve(_parent, args, { prisma }) {
    if (args.id) {
      return prisma.user.findUnique({
        where: { id: args.id },
      });
    }

    if (args.email) {
      return prisma.user.findUnique({
        where: { email: args.email },
      });
    }

    if (args.uid) {
      return prisma.user.findUnique({
        where: { uid: args.uid },
      });
    }

    // TODO: setup custom error handler
    throw new Error('No Parameters sent, please send parameters');
  },
});

export const GetUsersInputType = inputObjectType({
  name: 'GetUsersInputType',
  description: 'Input arguments used in getUsers query',
  definition(t) {
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('referredBy');
    t.list.nonNull.string('festID');
    t.boolean('isNitrStudent');
  },
});

export const getUsers = queryField('getUsers', {
  type: list('User'),
  description: 'Returns a list of all the users depending upon the arguments',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    params: nonNull('GetUsersInputType'),
  },
  resolve(_parent, args, { prisma }) {
    if (args.params.isNitrStudent) {
      return prisma.user.findMany({
        where: {
          rollNumber: {
            not: null,
          },
        },
      });
    }

    if (args.params.festID) {
      return prisma.user.findMany({
        where: {
          festID: {
            hasEvery: args.params.festID,
          },
        },
      });
    }

    if (args) {
      return prisma.user.findMany({
        where: {
          ...args.params,
          festID: undefined,
        },
      });
    }

    return prisma.user.findMany();
  },
});

export const user = queryField('user', {
  type: list('User'),
  description: 'Returns a list of users depending upon the parameters passed',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    uid: idArg(),
    email: stringArg(),
    state: stringArg(),
    city: stringArg(),
    college: stringArg(),
    stream: stringArg(),
    referredBy: stringArg(),
    festID: list(nonNull(stringArg())),
    isNitrStudent: booleanArg(),
  },
  resolve(_parent, args, { prisma }) {
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
    } = args;

    if (id || uid || email) {
      return prisma.user.findMany({
        where: {
          id: id || undefined,
          email: email || undefined,
          uid: uid || undefined,
        },
      });
    }

    if (state || city || college || stream || referredBy || isNitrStudent) {
      return prisma.user.findMany({
        where: {
          state: state || undefined,
          city: city || undefined,
          college: college || undefined,
          stream: stream || undefined,
          referredBy: referredBy || undefined,
        },
      });
    }

    if (festID) {
      return prisma.user.findMany({
        where: {
          festID: {
            hasEvery: args.festID || [],
          },
        },
      });
    }

    return prisma.user.findMany();
  },
});
