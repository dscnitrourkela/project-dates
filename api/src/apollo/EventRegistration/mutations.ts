import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const EventRegistrationCreateInputType = inputObjectType({
  name: 'EventRegistrationCreateInputType',
  description: `Input arguments used in createEventRegistration mutation`,
  definition(t) {
    t.nonNull.id('eventID');
    t.nonNull.id('userID');
    t.string('submittedPDF');
  },
});

export const createEventRegistration = mutationField(
  'createEventRegistration',
  {
    type: 'EventRegistration',
    description: `Creates an event registration record`,
    authorize: (_parent, args, ctx) =>
      args.orgID &&
      (args.eventRegistration.userID || args.eventRegistration.eventID)
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
      eventRegistration: nonNull('EventRegistrationCreateInputType'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventRegistration.create({
        data: args.eventRegistration,
      });
    },
  },
);

export const deleteEventRegistration = mutationField(
  'deleteEventRegistration',
  {
    type: 'EventRegistration',
    description: `Deletes an existing event registration record`,
    authorize: (_parent, _args, ctx) =>
      checkGqlPermissions(ctx, [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.SUPER_EDITOR,
      ]),
    args: {
      id: nonNull(idArg()),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventRegistration.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
);
