import { idArg, list, nonNull, queryField } from 'nexus';

export const team = queryField('team', {
  type: list('Team'),
  description:
    'Returns a list of all the team members of the given organsation',
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
