import { idArg, list, queryField } from 'nexus';

export const getOrg = queryField('getOrg', {
  type: 'Org',
  args: {
    id: idArg(),
  },
  resolve(_parent, args, { prisma }) {
    if (args.id) {
      return prisma.org.findUnique({
        where: {
          id: args.id,
        },
      });
    }

    // TODO: setup custom error handler
    throw new Error('No Parameters sent, please send parameters');
  },
});

export const getOrgs = queryField('getOrgs', {
  type: list('Org'),
  resolve(_parent, _args, { prisma }) {
    return prisma.org.findMany();
  },
});
