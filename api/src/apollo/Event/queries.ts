import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const event = queryField('event', {
  type: list('Event'),
  description: `Returns as list of events depending upon the arguments`,
  authorize: (_parent, args, ctx) =>
    args.id || args.orgID ? true : checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    orgID: idArg(),
    orgType: 'OrgType',
    startDate: 'DateTime',
    endDate: 'DateTime',
    status: 'StatusType',
    pagination: 'paginationInputType',
  },
  resolve(_parent, args, { prisma }) {
    const { id, orgID, orgType, startDate, endDate, status, pagination } = args;

    const prismaQuery = {
      id: id || undefined,
      orgType: orgType || undefined,
      status: status || undefined,
      orgID: { has: orgID || undefined },
      AND: [
        { startDate: { gte: startDate || undefined } },
        { endDate: { lte: endDate || undefined } },
      ],
    };

    if (id || orgID || orgType || startDate || endDate || status) {
      return prisma.event.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: prismaQuery,
      });
    }

    return prisma.event.findMany();
  },
});
