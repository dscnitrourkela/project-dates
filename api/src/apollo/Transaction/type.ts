import { objectType } from 'nexus';

export const Transaction = objectType({
  name: 'Transaction',
  description: 'Refers to the transaction details of any sort of payment',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('amount');
    t.nonNull.id('transactionID');
    t.nonNull.transactionType('type');
    t.nonNull.date('timestamp');
    t.string('comment');

    t.nonNull.id('userID');
    t.nonNull.field('user', {
      type: 'User',
      async resolve(parent, _args, { prisma }) {
        const user = await prisma.user.findUnique({
          where: { id: parent.userID },
        });

        if (!user) throw new Error('User not found');
        return user;
      },
    });

    t.nonNull.id('orgID');
    t.nonNull.field('org', {
      type: 'Org',
      async resolve(parent, _arg, { prisma }) {
        const org = await prisma.org.findUnique({
          where: {
            id: parent.orgID,
          },
        });

        if (!org) throw new Error('Org not found');
        return org;
      },
    });
  },
});
