import { idArg, inputObjectType, list, mutationField, nonNull } from 'nexus';

export const TeamCreateInputType = inputObjectType({
  name: 'TeamCreateInputType',
  definition(t) {
    t.nonNull.id('id');
    t.string('position');
    t.string('team');
    t.nonNull.id('userID');
    t.nonNull.id('orgID');
    t.int('priority');
  },
});

export const createTeam = mutationField('createTeam', {
  type: 'Int',
  args: {
    team: nonNull(list(nonNull('TeamCreateInputType'))),
  },
  async resolve(_parent, args, { prisma }) {
    const { count } = await prisma.team.createMany({
      data: args.team,
    });

    return count;
  },
});

export const TeamUpdateInputType = inputObjectType({
  name: 'TeamUpdateInputType',
  definition(t) {
    t.string('position');
    t.string('team');
    t.id('userID');
    t.id('orgID');
    t.int('priority');
  },
});

export const updateTeam = mutationField('updateTeam', {
  type: 'Team',
  args: {
    id: nonNull(idArg()),
    team: nonNull('TeamUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.team.update({
      where: {
        id: args.id,
      },
      data: {
        ...args.team,
        userID: args.team?.userID || undefined,
        orgID: args.team?.orgID || undefined,
      },
    });
  },
});
