import { idArg, list, nonNull, queryField } from 'nexus';

export const getTeam = queryField('getTeam', {
  type: list('Team'),
  args: {
    orgID: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.team.findMany({
      where: {
        orgID: args.orgID,
      },
    });
  },
});
