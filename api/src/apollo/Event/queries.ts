import { idArg, list, nonNull, queryField } from 'nexus';

export const getEvent = queryField('getEvent', {
  type: 'Event',
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getEvents = queryField('getEvents', {
  type: list('Event'),
  args: {
    orgID: list(idArg()),
    orgType: 'orgType',
    poc: list(idArg()),
    repeadDay: 'repeatType',
  },
  resolve(_parent, args, { prisma }) {
    if (args.orgID) {
      prisma.event.findMany({
        where: {
          orgID: {},
        },
      });
    }

    // if (args.orgType) {
    // }
  },
});
