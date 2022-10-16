import { mutationField, nonNull, stringArg } from 'nexus';

export const createLink = mutationField('createLink', {
  type: 'Link',
  args: {
    description: nonNull(stringArg()),
    url: nonNull(stringArg()),
  },

  resolve(_parent, args, context) {
    const { description, url } = args;

    return context.prisma.link.create({
      data: {
        description,
        url,
      },
    });
  },
});
