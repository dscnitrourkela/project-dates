import { objectType } from 'nexus';

export const TeamRegistration = objectType({
  name: 'TeamRegistration',
  description: 'Represents the registration of a team for a particular event',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.id('teamName');

    t.nonNull.id('eventID');
    t.field('event', {
      type: 'Event',
      resolve(parent, _args, { prisma }) {
        return prisma.event.findUnique({
          where: {
            id: parent.eventID,
          },
        });
      },
    });

    t.nonNull.list.nonNull.id('userIDs');
    t.list.field('users', {
      type: 'User',
      resolve(parent, _args, { prisma }) {
        return prisma.user.findMany({
          where: {
            id: {
              in: parent.userIDs,
            },
          },
        });
      },
    });

    t.date('createdAt');
    t.date('updatedAt');
  },
});
