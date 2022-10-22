import { objectType } from 'nexus';
import { NexusGenObjects } from 'nexus_generated/nexus-typegen';

export const Event = objectType({
  name: 'Event',
  description:
    'Refers to the various events created by the different organisations',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.string('poster');
    t.nonNull.date('startDate');
    t.nonNull.date('endDate');
    t.nonNull.orgType('orgType');
    t.nonNull.list.nonNull.string('notes');
    t.nonNull.boolean('weekly');
    t.repeatType('repeatDay');
    t.nonNull.int('priority');
    t.nonNull.status('status');

    t.nonNull.id('locationID');
    t.field('location', {
      type: 'Location',
      resolve(parent, _args, { prisma }) {
        return prisma.location.findUnique({
          where: {
            id: parent.locationID,
          },
        });
      },
    });

    t.nonNull.list.nonNull.id('pocID');
    t.nonNull.list.field('poc', {
      type: 'User',
      async resolve(parent, _args, { prisma }) {
        const pocs: Array<NexusGenObjects['User']> = [];

        const promiseCalls = parent.pocID.map(id =>
          prisma.user
            .findUnique({
              where: { id },
            })
            .then(poc => {
              if (poc) pocs.push(poc);
            }),
        );

        await Promise.all(promiseCalls);
        return pocs;
      },
    });

    t.nonNull.list.nonNull.id('orgID');
    t.nonNull.list.field('org', {
      type: 'Org',
      async resolve(parent, _args, { prisma }) {
        const orgs: Array<NexusGenObjects['Org']> = [];

        const promiseCalls = parent.orgID.map(id =>
          prisma.org
            .findUnique({
              where: { id },
            })
            .then(org => {
              if (org) orgs.push(org);
            }),
        );

        await Promise.all(promiseCalls);
        return orgs;
      },
    });
  },
});
