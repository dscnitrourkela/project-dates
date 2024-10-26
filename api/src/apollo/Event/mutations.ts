import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull, list } from 'nexus';

export const EventCreateInputType = inputObjectType({
  name: 'EventCreateInputType',
  description: `Input arguments used in createEvent mutation`,
  definition(t) {
    t.nonNull.string('name');
    t.string('subHeading');
    t.nonNull.string('description');
    t.string('prizeMoney');
    t.list.nonNull.string('contact');
    t.nonNull.string('poster');
    t.string('rules');
    t.nullable.id('locationID');
    t.nonNull.date('startDate');
    t.date('endDate');
    t.nonNull.list.nonNull.id('orgID');
    t.orgType('orgType');
    t.list.nonNull.string('notes');
    t.list.nonNull.id('pocID');
    t.boolean('weekly');
    t.repeatType('repeatDay', { default: null });
    t.int('priority');
    t.string('type');
    t.status('status', { default: 'DRAFT' });
  },
});

export const createEvent = mutationField('createEvent', {
  type: 'Event',
  description: `Creates a new event record`,
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
    orgID: nonNull(idArg()),
    event: nonNull('EventCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.create({
      data: {
        ...args.event,
        contact: args.event.contact || [],
        pocID: args.event.pocID || [],
        notes: args.event.notes || [],
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
    t.list.nonNull.string('contact');
    t.string('rules');
    t.string('poster');
    t.id('locationID');
    t.date('startDate');
    t.date('endDate');
    t.list.nonNull.id('orgID');
    t.orgType('orgType');
    t.list.nonNull.string('notes');
    t.list.nonNull.id('pocID');
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
        contact: args.event?.contact || undefined,
        description: args.event?.description || undefined,
        poster: args.event?.poster || undefined,
        rules: args.event?.rules || undefined,
        startDate: args.event?.startDate || undefined,
        endDate: args.event?.endDate || undefined,
        orgID: args.event?.orgID || undefined,
        orgType: args.event?.orgType || undefined,
        priority: args.event?.priority || undefined,
        type: args.event?.type?.toUpperCase() || undefined,
        status: args.event?.status || undefined,
      },
    });
  },
});

// Mutation to add multiple events at once
export const createMultipleEvents = mutationField('createMultipleEvents', {
  type: list('Event'),
  description: 'Creates multiple events at once',
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
    orgID: nonNull(idArg()),
    events: nonNull(list(nonNull('EventCreateInputType'))),
  },
  async resolve(_parent, args, { prisma }) {
    const createdEvents = await Promise.all(
      args.events.map(async (eventData: typeof args.events[number]) =>
        prisma.event.create({
          data: {
            ...eventData,
            status: eventData.status || 'ACTIVE',
            type: eventData.type?.toUpperCase(),
            contact: eventData.contact || [],
            pocID: eventData.pocID || [],
            notes: eventData.notes || [],
          },
        }),
      ),
    );

    return createdEvents;
  },
});
