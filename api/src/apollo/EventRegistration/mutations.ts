import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const EventRegistrationCreateInputType = inputObjectType({
  name: 'EventRegistrationCreateInputType',
  description: `Input arguments used in createEventRegistration mutation`,
  definition(t) {
    t.nonNull.id('eventID');
    t.nonNull.id('userID');
  },
});

export const createEventRegistration = mutationField(
  'createEventRegistration',
  {
    type: 'EventRegistration',
    description: `Creates an event registration record`,
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

export const deleteEventRegistration = mutationField(
  'deleteEventRegistration',
  {
    type: 'EventRegistration',
    description: `Deletes an existing event registration record`,
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
