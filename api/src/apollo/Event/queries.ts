import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField, stringArg } from 'nexus';

export const getEventsByType = queryField('getEventsByType', {
  type: list('Event'),
  description: `Returns as list of events depending upon the arguments`,
  authorize: (_parent, args, ctx) =>
    args.orgID ? true : checkGqlPermissions(ctx, []),
  args: {
    orgID: idArg(),
    type: stringArg(),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, args, { prisma }) {
    const { type, pagination } = args;

    return prisma.event.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: {
        type: type || undefined,
      },
    });
  },
});
