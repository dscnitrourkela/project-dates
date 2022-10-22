import { idArg, list, nonNull, queryField } from 'nexus';

export const getTransaction = queryField('getTransaction', {
  type: 'Transaction',
  description: 'Returns a transaction record whose id is passed',
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
  description:
    'Returns a list of transactions depending upon the arguments passed',
  args: {
    orgID: idArg(),
    type: 'TransactionType',
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
