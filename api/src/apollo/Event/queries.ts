import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { PERMISSIONS } from '@constants';
import { idArg, list, queryField } from 'nexus';

export const getEvents = queryField('getEvents', {
  type: list('Event'),
  description: `Returns a list of events`,
  authorize: (_parent, args, ctx) =>
    args.orgID
      ? checkGqlPermissions(ctx, [])
      : checkGqlPermissions(
          ctx,
          [
            PERMISSIONS.SUPER_ADMIN,
            PERMISSIONS.SUPER_EDITOR,
            PERMISSIONS.SUPER_VIEWER,
            PERMISSIONS.ORG_ADMIN,
            PERMISSIONS.ORG_EDITOR,
            PERMISSIONS.ORG_VIEWER,
          ],
          args.orgID || undefined,
        ),
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
