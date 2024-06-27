import { queryField, list, idArg } from 'nexus';
import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';

export const teamRegistrationsByUser = queryField('teamRegistrationsByUser', {
  type: list('TeamRegistration'),

  // returns entire team registration object details where user is in team
  description: `Returns team registrations for a given user`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
      PERMISSIONS.SUPER_VIEWER,
      PERMISSIONS.ORG_ADMIN,
      PERMISSIONS.ORG_EDITOR,
      PERMISSIONS.ORG_VIEWER,
    ]),
  args: {
    userID: idArg(),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, { userID, pagination }, { prisma }) {
    const teamRegistrations = await prisma.teamRegistration.findMany({
      where: {
        userIDs: {
          has: userID,
        },
      },
      skip: pagination?.skip,
      take: pagination?.take,
    });

    return teamRegistrations;
  },
});
