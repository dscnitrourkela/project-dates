import { idArg, list, queryField, stringArg } from 'nexus';

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

export const getUsers = queryField('getUsers', {
  type: list('User'),
  args: {
    state: stringArg(),
    city: stringArg(),
    college: stringArg(),
    stream: stringArg(),
    referredBy: stringArg(),
  },
  resolve(_parent, args, { prisma }) {
    if (args) {
      return prisma.user.findMany({
        where: args,
      });
    }

    return prisma.user.findMany();
  },
});
