import { queryField, list, idArg } from 'nexus';
import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';

export const teamRegistrations = queryField('teamRegistrations', {
  type: list('TeamRegistration'),

  // returns entire team registration object details where user is in team
  description: `Returns team registrations for a given user`,
  authorize: (_parent, args, ctx) =>
    args.orgID && args.userID
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
    id: idArg(),
    userID: idArg(),
    eventID: idArg(),
    orgID: idArg(),
    pagination: 'paginationInputType',
  },
  resolve(_parent, { id, userID, pagination, eventID }, { prisma }) {
    if (id || userID || eventID) {
      return prisma.teamRegistration.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
        where: {
          id: id || undefined,
          userIDs: userID ? { has: userID } : undefined,
          eventID: eventID || undefined,
        },
      });
    }
    return prisma.teamRegistration.findMany();
  },
});
