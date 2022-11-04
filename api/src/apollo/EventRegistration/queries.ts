import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const eventRegistration = queryField('eventRegistration', {
  type: list('EventRegistration'),
  description: `Returns a list of events depending upon the arguments`,
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    userID: idArg(),
    eventID: idArg(),
  },
  resolve(_parent, args, { prisma }) {
    const { id, userID, eventID } = args;

    if (id || userID || eventID) {
      return prisma.eventRegistration.findMany({
        where: {
          id: id || undefined,
          userID: userID || undefined,
          eventID: eventID || undefined,
        },
      });
    }

    throw new Error(
      'Missing parameters: either id, userID or eventID are required',
    );
  },
});

export const eventRegistrations = queryField('eventRegistrations', {
  type: list('EventRegistration'),
  description: `Returns a list of events depending upon the arguments`,
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
    eventID: idArg(),
  },
  resolve(_parent, args, { prisma }) {
    const { eventID } = args;

    if (eventID) {
      return prisma.eventRegistration.findMany({
        where: {
          eventID: eventID || undefined,
        },
      });
    }

    return prisma.eventRegistration.findMany();
  },
});
