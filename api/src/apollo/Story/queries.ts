import { idArg, list, nonNull, queryField } from 'nexus';

export const getStory = queryField('getStory', {
  type: 'Story',
  description: 'Returns a story whose id is passed',
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parents, args, { prisma }) {
    return prisma.story.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getStories = queryField('getStories', {
  type: list('Story'),
  description: 'Returns a list of all the stories of a particualr organisation',
  args: {
    orgID: idArg(),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.story.findMany({
      where: {
        orgID: args.orgID || undefined,
      },
    });
  },
});
