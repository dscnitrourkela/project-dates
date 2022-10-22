import { idArg, list, nonNull, queryField } from 'nexus';

export const getLocation = queryField('getLocation', {
  type: 'Location',
  description: 'Returns the information of a location whose id is passed',
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
  description: 'Returns a list of all the locations stored',
  resolve(_parent, _args, { prisma }) {
    return prisma.location.findMany();
  },
});
