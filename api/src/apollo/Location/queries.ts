import { idArg, list, nonNull, queryField } from 'nexus';

export const getLocation = queryField('getLocation', {
  type: 'Location',
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.location.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getLocations = queryField('getLocations', {
  type: list('Location'),
  resolve(_parent, _args, { prisma }) {
    return prisma.location.findMany();
  },
});
