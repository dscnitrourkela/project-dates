import { nonNull, objectType } from 'nexus';
import { NexusGenObjects } from 'nexus_generated/nexus-typegen';

export const User = objectType({
  name: 'User',
  description: 'User of the application',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.string('uid');
    t.string('name');
    t.string('photo');
    t.gender('gender');
    t.date('dob');
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('mobile');
    t.string('selfID');
    t.string('referredBy');
    t.string('rollNumber');

    t.nonNull.list.id('festID');
    t.nonNull.list.field('fests', {
      type: nonNull('Org'),
      async resolve(parent, _args, { prisma }) {
        const fests: Array<NexusGenObjects['Org']> = [];

        const promiseCalls = parent.festID.map(id =>
          prisma.org
            .findMany({ where: { festID: id } })
            .then(fest => fests.push(fest[0])),
        );

        await Promise.all(promiseCalls);
        return fests;
      },
    });
  },
});
