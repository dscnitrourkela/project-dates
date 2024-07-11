import { objectType } from 'nexus';

export const EventRegistration = objectType({
  name: 'EventRegistration',
  description: 'Refers to the registrations of a user for a particular event',
  definition(t) {
    t.nonNull.id('id');
    t.string('submittedPDF');

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
