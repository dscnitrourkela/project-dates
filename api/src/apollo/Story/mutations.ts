import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const StoryCreateInputType = inputObjectType({
  name: 'StoryCreateInputType',
  definition(t) {
    t.nonNull.id('orgID');
    t.nonNull.string('image');
    t.string('linkTo');
  },
});

export const createStory = mutationField('createStory', {
  type: 'Story',
  args: {
    story: nonNull('StoryCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.story.create({
      data: args.story,
    });
  },
});

export const deleteStory = mutationField('deleteStory', {
  type: 'Boolean',
  args: {
    id: nonNull(idArg()),
  },
  async resolve(_parent, args, { prisma }) {
    try {
      await prisma.story.delete({
        where: {
          id: args.id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
});
