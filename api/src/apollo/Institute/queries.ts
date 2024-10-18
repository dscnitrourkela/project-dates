import { queryField, list, nonNull } from 'nexus';

export const institutes = queryField('institutes', {
  type: list(nonNull('Institute')),
  description: 'Fetch a list of institutes with their registration stats',
  resolve(_parent, _args, { prisma }) {
    return prisma.institute.findMany({
      select: {
        id: true,
        name: true,
        registrations: true,
      },
    });
  },
});
