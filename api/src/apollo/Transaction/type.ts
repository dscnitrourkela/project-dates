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
    t.field('user', {
      type: 'User',
      resolve(parent, _args, { prisma }) {
        return prisma.user.findUnique({
          where: { uid: parent.userID },
        });
      },
    });

    t.nonNull.id('orgID');
    t.field('org', {
      type: 'Org',
      resolve(parent, _arg, { prisma }) {
        return prisma.org.findUnique({
          where: {
            id: parent.orgID,
          },
        });
      },
    });
  },
});
