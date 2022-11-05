import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

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

export const TransactionUpdateInputType = inputObjectType({
  name: 'TransactionUpdateInputType',
  description: 'Input arguments used in updateTransaction mutation',
  definition(t) {
    t.id('userID');
    t.transactionType('type');
    t.id('orgID');
    t.string('comment');
  },
});

export const updateTransaction = mutationField('updateTransaction', {
  type: 'Transaction',
  description: 'Updates an existing record of transation',
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [PERMISSIONS.SUPER_ADMIN]),
  args: {
    id: nonNull(idArg()),
    transaction: nonNull('TransactionUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transaction.update({
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
