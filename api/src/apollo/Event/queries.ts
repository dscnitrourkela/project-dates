//import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const getEvents = queryField('getEvents', {
  type: list('Event'),
  description: `Returns a list of events`,
  authorize: (_parent, _args) => true,
  // authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    orgID: idArg(),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, args, { prisma }) {
    const { orgID, pagination } = args;

    return prisma.event.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: {
        orgID: {
          has: orgID,
        },
      },
    });
  },
});
