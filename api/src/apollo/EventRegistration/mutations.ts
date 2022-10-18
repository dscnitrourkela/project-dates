import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const EventRegistrationCreateInputType = inputObjectType({
  name: 'EventRegistrationCreateInputType',
  definition(t) {
    t.nonNull.id('eventID');
    t.nonNull.id('userID');
  },
});

export const createEventRegistration = mutationField(
  'createEventRegistration',
  {
    type: 'EventRegistration',
    args: {
      eventRegistration: nonNull('EventRegistrationCreateInputType'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventRegistration.create({
        data: args.eventRegistration,
      });
    },
  },
);

export const EventRegistrationUpdateInput = inputObjectType({
  name: 'EventRegistrationUpdateInput',
  definition(t) {
    t.id('eventID');
    t.id('userID');
  },
});

export const updateEventRegistration = mutationField(
  'updateEventRegistration',
  {
    type: 'EventRegistration',
    args: {
      id: nonNull(idArg()),
      eventRegistration: nonNull('EventRegistrationUpdateInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventRegistration.update({
        where: {
          id: args.id,
        },
        data: {
          eventID: args.eventRegistration?.eventID || undefined,
          userID: args.eventRegistration?.userID || undefined,
        },
      });
    },
  },
);
