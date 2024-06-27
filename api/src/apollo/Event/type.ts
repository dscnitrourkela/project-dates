import { objectType } from 'nexus';

export const Event = objectType({
  name: 'Event',
  description:
    'Refers to the various events created by different organizations',
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
    t.string('type');
    t.status('status');
    t.boolean('isTeamEvent');
    t.int('maxTeamSize');
    t.int('minTeamSize');
    t.list.string('contact');
    t.list.id('pocID');
    t.list.nonNull.id('orgID'); // Ensure orgID is a list of non-null strings

    t.list.field('org', {
      type: 'Org',
      resolve(parent, _args, { prisma }) {
        if (!parent.orgID || parent.orgID.length === 0) {
          return [];
        }

        return prisma.org.findMany({
          where: {
            id: {
              in: parent.orgID as string[],
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
