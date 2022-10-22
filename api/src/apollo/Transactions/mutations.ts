import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const TransactionCreateInputType = inputObjectType({
  name: 'TransactionCreateInputType',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.int('amount');
    t.nonNull.id('userID');
    t.nonNull.id('transactionID');
    t.nonNull.transactionType('type');
    t.nonNull.date('timestamp');
    t.nonNull.id('orgID');
    t.string('comment');
  },
});

export const createTransaction = mutationField('createTransaction', {
  type: 'Transaction',
  args: {
    transaction: nonNull('TransactionCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transactions.create({
      data: args.transaction,
    });
  },
});

export const TransactionUpdateInputType = inputObjectType({
  name: 'TransactionUpdateInputType',
  definition(t) {
    t.id('userID');
    t.transactionType('type');
    t.id('orgID');
    t.string('comment');
  },
});

export const updateTransaction = mutationField('updateTransaction', {
  type: 'Transaction',
  args: {
    id: nonNull(idArg()),
    transaction: nonNull('TransactionUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transactions.update({
      where: {
        id: args.id,
      },
      data: {
        userID: args.transaction?.userID || undefined,
        type: args.transaction?.type || undefined,
        orgID: args.transaction?.orgID || undefined,
        comment: args.transaction?.comment,
      },
    });
  },
});
