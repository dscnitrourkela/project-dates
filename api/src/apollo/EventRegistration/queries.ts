import { idArg, list, nonNull, queryField } from 'nexus';

export const getEventRegistration = queryField('getEventRegistration', {
  type: 'EventRegistration',
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
