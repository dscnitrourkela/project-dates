import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { inputObjectType, mutationField, nonNull } from 'nexus';

export const TransactionCreateInputType = inputObjectType({
  name: 'TransactionCreateInputType',
  description: 'Input arguments used in createTransaction mutation',
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
  description: 'Creates a new transaction record',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    transaction: nonNull('TransactionCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transaction.create({
      data: args.transaction,
    });
  },
});
