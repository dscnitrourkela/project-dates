import { idArg, list, nonNull, queryField } from 'nexus';

export const getDeveloperInfo = queryField('getDeveloperInfo', {
  type: 'DeveloperInfo',
  description: `Returns the information of a developer whose id is passed as an argument`,
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
  description: `Returns a list of all the developers of the application`,
  resolve(_parent, _args, { prisma }) {
    return prisma.developerInfo.findMany();
  },
});
