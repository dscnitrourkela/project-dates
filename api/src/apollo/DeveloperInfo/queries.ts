import { idArg, list, nonNull, queryField } from 'nexus';

export const getDeveloperInfo = queryField('getDeveloperInfo', {
  type: 'DeveloperInfo',
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.developerInfo.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getDeveloperInfos = queryField('getDeveloperInfos', {
  type: list('DeveloperInfo'),
  resolve(_parent, _args, { prisma }) {
    return prisma.developerInfo.findMany();
  },
});
