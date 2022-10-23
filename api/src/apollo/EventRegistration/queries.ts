import { idArg, list, nonNull, queryField } from 'nexus';

export const getEventRegistration = queryField('getEventRegistration', {
  type: 'EventRegistration',
  description: `Returns the event registration whose id is passed as an argument`,
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.eventRegistration.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getEventRegistrations = queryField('getEventRegistrations', {
  type: list('EventRegistration'),
  description: `Returns a list of events depending upon the arguments`,
  args: {
    userID: nonNull(idArg()),
    eventID: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.eventRegistration.findMany({
      where: {
        userID: args.userID,
        eventID: args.eventID,
      },
    });
  },
});
