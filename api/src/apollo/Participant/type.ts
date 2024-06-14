import { nonNull, objectType } from 'nexus';

export const Participant = objectType({
  name: 'Participant',
  description: 'Participant of the event',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.string('uid');
    t.string('name');
    t.string('college');
    t.string('rollNumber');
    t.string('IdCardPhoto');
    t.string('mobile');
    t.string('aicheRegID');
    t.date('createdAt');
    t.string('tSize');
    t.string('srcID');

    t.nonNull.list.nonNull.id('festID');
    t.nonNull.list.field('events', {
      type: nonNull('EventRegistration'),
      resolve(parent, _args, { prisma }) {
        return prisma.eventRegistration.findMany({
          where: {
            eventID: {
              in: parent.festID,
            },
          },
        });
      },
    });
  },
});
