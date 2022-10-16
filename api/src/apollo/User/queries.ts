import { idArg, inputObjectType, list, nonNull, queryField, stringArg } from 'nexus';

export const getUser = queryField('getUser', {
  type: 'User',
  args: {
    id: idArg(),
    email: stringArg(),
  },
  resolve(_parent, args, { prisma }) {
    if (args.id) {
      return prisma.user.findUnique({
        where: {
          id: args.id,
        },
      });
    }

    if (args.email) {
      return prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });
    }

    // TODO: setup custom error handler
    throw new Error('No Parameters sent, please send parameters');
  },
});

export const GetUsersInputType = inputObjectType({
  name: 'GetUsersInputType',
  definition(t) {
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('referredBy');
  },
});

export const getUsers = queryField('getUsers', {
  type: list('User'),
  args: {
    params: nonNull('GetUsersInputType'),
    festID: list(nonNull(stringArg())),
  },
  resolve(_parent, args, { prisma }) {
    if (args.festID) {
      return prisma.user.findMany({
        where: {
          festID: {
            hasEvery: args.festID,
          },
        },
      });
    }

    if (args) {
      return prisma.user.findMany({
        where: args.params,
      });
    }

    return prisma.user.findMany();
  },
});
