import { nonNull, objectType } from 'nexus';

export const User = objectType({
  name: 'User',
  description: 'User of the application',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('email');
    t.nonNull.string('uid');
    t.string('name');
    t.string('college');
    t.string('mobile');
    t.string('rollNumber');
    t.date('createdAt');
    t.nonNull.list.nonNull.id('ca');

    t.string('tSize');
    t.string('srcID');
    t.string('idCardPhoto');
    t.string('aicheRegID');

    t.nonNull.list.nonNull.id('festID');
    t.nonNull.list.field('fests', {
      type: nonNull('Org'),
      resolve(parent, _args, { prisma }) {
        return prisma.org.findMany({
          where: {
            festID: {
              in: parent.festID,
            },
          },
        });
      },
    });
  },
});
