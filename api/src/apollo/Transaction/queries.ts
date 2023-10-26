import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, objectType, queryField } from 'nexus';

const PaginatedTransactionType = objectType({
  name: 'PaginatedTransactionType',
  description: 'Paginated response for transaction query',
  definition(t) {
    t.list.field('data', {
      type: 'Transaction',
    });
    t.int('count');
  },
});

export const transaction = queryField('transaction', {
  type: PaginatedTransactionType,
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
    userID: idArg(),
    pagination: 'paginationInputType',
  },
  async resolve(_parent, args, { prisma }) {
    const [transactions, count] = await prisma.$transaction([
      prisma.transaction.findMany({
        skip: args.pagination?.skip,
        take: args.pagination?.take,
        where: {
          id: args.id || undefined,
          orgID: args.orgID || undefined,
          type: args.type || undefined,
          userID: args.userID || undefined,
        },
      }),
      prisma.transaction.count({
        where: {
          id: args.id || undefined,
          orgID: args.orgID || undefined,
          type: args.type || undefined,
          userID: args.userID || undefined,
        },
      }),
    ]);

    return {
      data: transactions,
      count,
    };
  },
});
