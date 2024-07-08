import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull, arg } from 'nexus';

export const TeamRegistrationCreateInputType = inputObjectType({
  name: 'TeamRegistrationCreateInputType',
  description: 'Input arguments used in createTeamRegistration mutation',
  definition(t) {
    t.nonNull.id('eventID');
    t.nonNull.list.nonNull.id('userIDs');
    t.nonNull.string('teamName');
  },
});

export const createTeamRegistration = mutationField('createTeamRegistration', {
  type: 'TeamRegistration',
  description: 'Creates a team registration record',
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
    teamRegistration: nonNull(
      arg({
        type: 'TeamRegistrationCreateInputType',
      }),
    ),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.teamRegistration.create({
      data: args.teamRegistration,
    });
  },
});

export const deleteTeamRegistration = mutationField('deleteTeamRegistration', {
  type: 'TeamRegistration',
  description: 'Deletes an existing team registration record',
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.teamRegistration.delete({
      where: {
        id: args.id,
      },
    });
  },
});
