import { objectType } from 'nexus';
/*
export const locationResolver:
  | FieldResolver<'Event', 'location'>
  | undefined = (parent, _args, { prisma }) =>
  prisma.location.findUnique({
    where: {
      id: parent.locationID,
    },
  });
*/

export const Event = objectType({
  name: 'Event',
  description:
    'Refers to the various events created by the different organisations',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.string('subHeading');
    t.string('prizeMoney');
    t.string('description');
    t.string('poster');
    t.string('rules');
    t.date('startDate');
    t.date('endDate');
    t.orgType('orgType');
    t.list.string('notes');
    t.boolean('weekly');
    t.repeatType('repeatDay');
    t.int('priority');
    t.string('type');
    t.status('status');
    t.boolean('isTeamEvent');
    t.int('maxTeamSize');
    t.int('minTeamSize');
    /*
    t.id('locationID');
    t.field('location', {
      type: 'Location',
      resolve: locationResolver,
    });
*/
    t.list.string('contact');
    t.list.id('pocID');

    /* t.list.field('poc', {
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

    t.list.nonNull.id('orgID');
    t.list.field('org', {
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
*/
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

    t.nonNull.int('teamRegistrationCount', {
      resolve(parent, _args, { prisma }) {
        return prisma.teamRegistration.count({
          where: {
            eventID: parent.id,
          },
        });
      },
    });

    t.nonNull.list.field('teamRegistration', {
      type: 'TeamRegistration',
      resolve(parent, _args, { prisma }) {
        return prisma.teamRegistration.findMany({
          where: {
            eventID: parent.id,
          },
        });
      },
    });
  },
});
