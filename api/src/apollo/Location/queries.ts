import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const location = queryField('location', {
  type: list('Location'),
  description:
    'Returns a list of all the locations depending upon the arguments',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
  },
  resolve(_parent, args, { prisma }) {
    const { id } = args;

    if (id) {
      return prisma.location.findMany({
        where: {
          id: id || undefined,
        },
      });
    }

    return prisma.location.findMany();
  },
});
