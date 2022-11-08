import { idArg, list, queryField } from 'nexus';

export const developerInfo = queryField('developerInfo', {
  type: list('DeveloperInfo'),
  description: `Returns a list of all the developers of the application`,
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
