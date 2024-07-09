import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const EventCreateInputType = inputObjectType({
  name: 'EventCreateInputType',
  description: `Input arguments used in createEvent mutation`,
  definition(t) {
    t.nonNull.string('name');
    t.string('subHeading');
    t.nonNull.string('description');
    t.string('prizeMoney');
    t.nonNull.string('poster');
    t.string('rules');
    t.id('locationID');
    t.date('startDate');
    t.date('endDate');
    t.nonNull.list.nonNull.id('orgID');
    t.nonNull.orgType('orgType');
    t.int('priority');
    t.string('type');
    t.nonNull.status('status', { default: 'DRAFT' });
    t.boolean('isTeamEvent');
    t.int('maxTeamSize');
    t.int('minTeamSize');
  },
});

export const createEvent = mutationField('createEvent', {
  type: 'Event',
  description: `Creates a new event record`,
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
    orgID: nonNull(idArg()),
    event: nonNull('EventCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.create({
      data: {
        ...args.event,
        status: args.event.status || 'DRAFT',
      },
    });
  },
});

export const EventUpdateInputType = inputObjectType({
  name: 'EventUpdateInputType',
  description: `Input arguments used in updateEvent mutation`,
  definition(t) {
    t.string('name');
    t.string('subHeading');
    t.string('description');
    t.string('prizeMoney');
    t.string('rules');
    t.string('poster');
    t.id('locationID');
    t.date('startDate');
    t.date('endDate');
    t.list.nonNull.id('orgID');
    t.orgType('orgType');
    t.boolean('weekly');
    t.repeatType('repeatDay');
    t.int('priority');
    t.string('type');
    t.status('status');
  },
});

export const updateEvent = mutationField('updateEvent', {
  type: 'Event',
  description: `Updates an existing event record`,
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
    orgID: nonNull(idArg()),
    event: nonNull('EventUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.update({
      where: {
        id: args.id,
      },
      data: {
        name: args.event?.name || undefined,
        subHeading: args.event?.subHeading || undefined,
        prizeMoney: args.event?.prizeMoney || undefined,
        description: args.event?.description || undefined,
        poster: args.event?.poster || undefined,
        rules: args.event?.rules || undefined,
        locationID: args.event?.locationID || undefined,
        startDate: args.event?.startDate || undefined,
        endDate: args.event?.endDate || undefined,
        orgID: args.event?.orgID || undefined,
        orgType: args.event?.orgType || undefined,
        weekly: args.event?.weekly || undefined,
        repeatDay: args.event?.repeatDay || undefined,
        priority: args.event?.priority || undefined,
        type: args.event?.type?.toUpperCase() || undefined,
        status: args.event?.status || undefined,
      },
    });
  },
});
