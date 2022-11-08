import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, list, mutationField, nonNull } from 'nexus';

export const TeamCreateInputType = inputObjectType({
  name: 'TeamCreateInputType',
  description: 'Input arguments used in the createTeam mutation',
  definition(t) {
    t.nonNull.id('id');
    t.string('position');
    t.string('team');
    t.nonNull.id('userID');
    t.nonNull.id('orgID');
    t.int('priority');
  },
});

/**
 * A special case of creation
 * Since team members will be added in bulk,
 * this mutation takes an array of team members as input
 * and then after successful addition, returns a count of
 * all the added records.
 * The count could vary in case of any duplicate record is
 * sent (duplicates will be omitted)
 */
export const createTeam = mutationField('createTeam', {
  type: 'Int',
  description: 'Creates multiple/single record/s of team members',
  authorize: (_parent, args, ctx) =>
    checkGqlPermissions(
      ctx,
      [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.SUPER_EDITOR,
        PERMISSIONS.ORG_ADMIN,
        PERMISSIONS.ORG_EDITOR,
      ],
      args.orgID,
    ),
  args: {
    team: nonNull(list(nonNull('TeamCreateInputType'))),
    orgID: nonNull(idArg()),
  },
  async resolve(_parent, args, { prisma }) {
    const { count } = await prisma.team.createMany({
      data: args.team,
    });

    return count;
  },
});

export const TeamUpdateInputType = inputObjectType({
  name: 'TeamUpdateInputType',
  description: 'Input arguments used in the udpateTeam mutation',
  definition(t) {
    t.string('position');
    t.string('team');
    t.id('userID');
    t.id('orgID');
    t.int('priority');
  },
});

export const updateTeam = mutationField('updateTeam', {
  type: 'Team',
  description: 'Updates the existing team member record',
  authorize: (_parent, args, ctx) =>
    checkGqlPermissions(
      ctx,
      [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.SUPER_EDITOR,
        PERMISSIONS.ORG_ADMIN,
        PERMISSIONS.ORG_EDITOR,
      ],
      args.orgID,
    ),
  args: {
    id: nonNull(idArg()),
    team: nonNull('TeamUpdateInputType'),
    orgID: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.team.update({
      where: {
        id: args.id,
      },
      data: {
        ...args.team,
        userID: args.team?.userID || undefined,
        orgID: args.team?.orgID || undefined,
      },
    });
  },
});
