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
    orgID: idArg(),
    orgType: 'OrgType',
    startDate: 'DateTime',
    endDate: 'DateTime',
    status: 'StatusType',
  },
  resolve(_parent, args, { prisma }) {
    /**
     * based on orgType
     * based on orgID
     * based on time (start and end)
     * based on status
     */

    const prismaQuery = {
      orgType: args.orgType || undefined,
      status: args.status || undefined,
      orgID: { has: args.orgID || undefined },
      AND: [
        { startDate: { gte: args.startDate || undefined } },
        { endDate: { lte: args.endDate || undefined } },
      ],
    };

    if (args) {
      return prisma.event.findMany({
        where: prismaQuery,
      });
    }

    throw new Error('missing parameters');
  },
});
