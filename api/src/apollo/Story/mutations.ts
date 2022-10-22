import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const StoryCreateInputType = inputObjectType({
  name: 'StoryCreateInputType',
  description: 'Input arguments used in the createStory mutation',
  definition(t) {
    t.nonNull.id('orgID');
    t.nonNull.string('image');
    t.string('linkTo');
  },
});

export const createStory = mutationField('createStory', {
  type: 'Story',
  description: 'Creates a new story record',
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
  description: 'Deletes and existing story record',
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
