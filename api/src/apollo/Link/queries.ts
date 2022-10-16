import { list, queryField } from 'nexus';

export const getFeed = queryField('getFeed', {
  type: list('Link'),
  resolve(_parent, _args, context) {
    return context.prisma.link.findMany();
  },
});
