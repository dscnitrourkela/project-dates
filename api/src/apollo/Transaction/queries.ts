import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, nonNull, queryField } from 'nexus';

export const transaction = queryField('transaction', {
  type: 'Transaction',
  description: 'Returns a transaction record whose id is passed',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transaction.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const transactions = queryField('transactions', {
  type: list('Transaction'),
  description: `Returns a list of transactions depending upon the arguments passed`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ORG_ADMIN]),
  args: {
    orgID: idArg(),
    type: 'TransactionType',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transaction.findMany({
      where: {
        orgID: args.orgID || undefined,
        type: args.type || undefined,
      },
    });
  },
});
