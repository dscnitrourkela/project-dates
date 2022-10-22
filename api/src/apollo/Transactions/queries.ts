import { idArg, list, nonNull, queryField } from 'nexus';

export const getTransaction = queryField('getTransaction', {
  type: 'Transaction',
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transactions.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getTransactions = queryField('getTransactions', {
  type: list('Transaction'),
  args: {
    orgID: idArg(),
    type: 'transactionType',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transactions.findMany({
      where: {
        orgID: args.orgID || undefined,
        type: args.type || undefined,
      },
    });
  },
});
