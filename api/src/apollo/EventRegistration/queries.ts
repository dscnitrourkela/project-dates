import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField, nonNull } from 'nexus';

export const eventRegistration = queryField('eventRegistration', {
  type: nonNull(list(nonNull('String'))),

  // to fetch list of eventIds for events where user has registered
  description: `Returns a list of events depending upon the arguments`,
  authorize: (_parent, args, ctx) =>
    args.id || (args.eventID && args.userID)
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
  async resolve(_parent, args, { prisma }) {
    const { id, userID, eventID, pagination } = args;

    const eventRegistrations = await prisma.eventRegistration.findMany({
      skip: pagination?.skip,
      take: pagination?.take,
      where: {
        id: id || undefined,
        userID: userID || undefined,
        eventID: eventID || undefined,
      },
    });

    return eventRegistrations.map(registration => registration.eventID);
  },
});
