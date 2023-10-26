import { FieldResolver, objectType } from 'nexus';

export const locationResolver:
  | FieldResolver<'Event', 'location'>
  | undefined = (parent, _args, { prisma }) =>
  prisma.location.findUnique({
    where: {
      id: parent.locationID,
    },
  });

export const Event = objectType({
  name: 'Event',
  description:
    'Refers to the various events created by the different organisations',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.string('subHeading');
    t.string('prizeMoney');
    t.nonNull.string('description');
    t.nonNull.string('poster');
    t.string('rules');
    t.nonNull.date('startDate');
    t.nonNull.date('endDate');
    t.nonNull.orgType('orgType');
    t.nonNull.list.nonNull.string('notes');
    t.nonNull.boolean('weekly');
    t.repeatType('repeatDay');
    t.nonNull.int('priority');
    t.string('type');
    t.nonNull.status('status');

    t.nonNull.id('locationID');
    t.field('location', {
      type: 'Location',
      resolve: locationResolver,
    });

    t.list.nonNull.string('contact');
    t.nonNull.list.nonNull.id('pocID');
    t.nonNull.list.field('poc', {
      type: 'User',
      async resolve(parent, _args, { prisma }) {
        return prisma.user.findMany({
          where: {
            id: {
              in: parent.pocID,
            },
          },
        });
      },
    });

    t.nonNull.list.nonNull.id('orgID');
    t.nonNull.list.field('org', {
      type: 'Org',
      resolve(parent, _args, { prisma }) {
        return prisma.org.findMany({
          where: {
            id: {
              in: parent.orgID,
            },
          },
        });
      },
    });

    t.nonNull.int('eventRegistrationCount', {
      resolve(parent, _args, { prisma }) {
        return prisma.eventRegistration.count({
          where: {
            eventID: parent.id,
          },
        });
      },
    });

    t.nonNull.list.field('eventRegistration', {
      type: 'EventRegistration',
      resolve(parent, _args, { prisma }) {
        return prisma.eventRegistration.findMany({
          where: {
            eventID: parent.id,
          },
        });
      },
    });
  },
});
