import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const EventCreateInputType = inputObjectType({
  name: 'EventCreateInputType',
  description: `Input arguments used in createEvent mutation`,
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.string('poster');
    t.nonNull.id('locationID');
    t.nonNull.date('startDate');
    t.nonNull.date('endDate');
    t.nonNull.list.nonNull.id('orgID');
    t.nonNull.orgType('orgType');
    t.nonNull.list.nonNull.string('notes');
    t.nonNull.list.nonNull.id('pocID');
    t.nonNull.boolean('weekly');
    t.repeatType('repeatDay', { default: null });
    t.nonNull.int('priority');
    t.status('status', { default: 'DRAFT' });
  },
});

export const createEvent = mutationField('createEvent', {
  type: 'Event',
  description: `Creates a new event record`,
  args: {
    event: nonNull('EventCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.create({
      data: {
        ...args.event,
        status: args.event.status || undefined,
      },
    });
  },
});

export const EventUpdateInputType = inputObjectType({
  name: 'EventUpdateInputType',
  description: `Input arguments used in updateEvent mutation`,
  definition(t) {
    t.string('name');
    t.string('description');
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
    t.status('status');
  },
});

export const updateEvent = mutationField('updateEvent', {
  type: 'Event',
  description: `Updates an existing event record`,
  args: {
    id: nonNull(idArg()),
    event: nonNull('EventUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.update({
      where: {
        id: args.id,
      },
      data: {
        name: args.event?.name || undefined,
        description: args.event?.description || undefined,
        poster: args.event?.poster || undefined,
        locationID: args.event?.locationID || undefined,
        startDate: args.event?.startDate || undefined,
        endDate: args.event?.endDate || undefined,
        orgID: args.event?.orgID || undefined,
        orgType: args.event?.orgType || undefined,
        notes: args.event?.notes || undefined,
        pocID: args.event?.pocID || undefined,
        weekly: args.event?.weekly || undefined,
        repeatDay: args.event?.repeatDay || undefined,
        priority: args.event?.priority || undefined,
        status: args.event?.status || undefined,
      },
    });
  },
});
