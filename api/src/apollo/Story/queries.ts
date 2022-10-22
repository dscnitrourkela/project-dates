import { idArg, list, nonNull, queryField } from 'nexus';

export const getStory = queryField('getStory', {
  type: 'Story',
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
