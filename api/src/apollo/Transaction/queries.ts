import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const transaction = queryField('transaction', {
  type: list('Transaction'),
  description: `Returns a list of transactions depending upon the arguments passed`,
  authorize: (_parent, args, ctx) =>
    args.id
      ? checkGqlPermissions(ctx, [])
      : checkGqlPermissions(
          ctx,
          [PERMISSIONS.SUPER_ADMIN, PERMISSIONS.ORG_ADMIN],
          args.orgID || undefined,
        ),
  args: {
    id: idArg(),
    orgID: idArg(),
    type: 'TransactionType',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.transaction.findMany({
      where: {
        id: args.id || undefined,
        orgID: args.orgID || undefined,
        type: args.type || undefined,
      },
    });
  },
});
