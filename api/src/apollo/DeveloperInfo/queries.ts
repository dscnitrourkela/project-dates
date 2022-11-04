import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const developerInfo = queryField('developerInfo', {
  type: list('DeveloperInfo'),
  description: `Returns a list of all the developers of the application`,
  authorize: (_parent, __args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
  },
  resolve(_parent, args, { prisma }) {
    const { id } = args;

    if (id) {
      return prisma.developerInfo.findMany({
        where: {
          id: id || undefined,
        },
      });
    }

    return prisma.developerInfo.findMany();
  },
});
