import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, list, queryField } from 'nexus';

export const story = queryField('story', {
  type: list('Story'),
  description:
    'Returns a list of all the stories depending upon the parameters',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    orgID: idArg(),
    pagination: 'paginationInputType',
  },
  resolve(_parents, args, { prisma }) {
    const { id, orgID } = args;

    if (id || orgID) {
      return prisma.story.findMany({
        skip: args.pagination?.skip,
        take: args.pagination?.take,
        where: {
          id: id || undefined,
          orgID: orgID || undefined,
        },
      });
    }

    return prisma.story.findMany();
  },
});
