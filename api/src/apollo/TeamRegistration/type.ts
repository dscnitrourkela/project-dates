import { objectType } from 'nexus';

export const TeamRegistration = objectType({
  name: 'TeamRegistration',
  description: 'Refers to the registrations of a team for a particular event',
  definition(t) {
    t.nonNull.id('id');

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
  },
});
