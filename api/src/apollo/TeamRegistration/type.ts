import { objectType } from 'nexus';

export const TeamRegistration = objectType({
  name: 'TeamRegistration',
  description: 'Refers to the registrations of a user for a particular Team',
  definition(t) {
    t.nonNull.id('id');

    t.nonNull.id('TeamID');
    t.field('Team', {
      type: 'Team',
      resolve(parent, _args, { prisma }) {
        return prisma.event.findUnique({
          where: {
            id: parent.TeamID,
          },
        });
      },
    });

    t.nonNull.id('userID');
    t.field('user', {
      type: 'User',
      resolve(parent, _args, { prisma }) {
        return prisma.user.findUnique({
          where: {
            id: parent.userID,
          },
        });
      },
    });
  },
});
