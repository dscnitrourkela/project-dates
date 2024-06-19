import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const event = queryField('getEvents', {
  type: list('Event'),
  description: `Returns a list of events`,
  authorize: (_parent, args, ctx) =>
    args.id ? true : checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    pagination: 'paginationInputType',
  },
  resolve(_parent, args, { prisma }) {
    const { id, pagination } = args;

    const prismaQuery = {
      id: id || undefined,
    };

    // Return all events if `id` is not provided
    return prisma.event.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: prismaQuery,
    });
  },
});
