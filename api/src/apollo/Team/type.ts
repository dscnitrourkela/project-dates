import { objectType } from 'nexus';

export const Team = objectType({
  name: 'Team',
  description: 'Refers to the team member part of a particular organisation',
  definition(t) {
    t.nonNull.id('id');
    t.string('position');
    t.string('team');
    t.int('priority');

    t.nonNull.id('userID');
    t.nonNull.field('user', {
      type: 'User',
      async resolve(parent, _args, { prisma }) {
        const user = await prisma.user.findUnique({
          where: { uid: parent.userID },
        });

        if (!user) throw new Error('User not found');
        return user;
      },
    });

    t.nonNull.id('orgID');
    t.nonNull.field('org', {
      type: 'Org',
      async resolve(parent, _arg, { prisma }) {
        const org = await prisma.org.findUnique({
          where: {
            id: parent.orgID,
          },
        });

        if (!org) throw new Error('Org not found');
        return org;
      },
    });
  },
});
