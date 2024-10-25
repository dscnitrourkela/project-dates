import { objectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  description: 'Refers to the various groups creating several different events',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.string('description');
    t.string('logo');
    t.string('tagline');
    t.string('coverImg');
    t.string('theme');
    t.int('registrationFee');
    t.int('registrations');
    t.date('startDate');
    t.date('endDate');
    t.status('status');
    //    t.collegeStatus('collegeStatus');
    t.orgSubType('orgSubType');
    t.nonNull.orgType('orgType');

    t.id('locationID');
    t.field('location', {
      type: 'Location',
      resolve(parent, _args, { prisma }) {
        return prisma.location.findUnique({
          where: {
            id: parent.locationID || undefined,
          },
        });
      },
    });

    t.id('festID');
    t.field('fest', {
      type: 'Org',
      resolve(parent, _args, { prisma }) {
        return prisma.org
          .findMany({
            where: {
              festID: parent.festID,
            },
          })
          .then(fest => fest[0]);
      },
    });

    // New field to get the count of students (users) associated with this Org
    t.nonNull.int('studentCount', {
      resolve(parent, _args, { prisma }) {
        return prisma.user.count({
          where: {
            college: parent.id,
          },
        });
      },
    });
  },
});
