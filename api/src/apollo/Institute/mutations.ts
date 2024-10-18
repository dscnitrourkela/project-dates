import { mutationField, nonNull, stringArg } from 'nexus';

export const incrementInstituteRegistration = mutationField(
  'incrementInstituteRegistration',
  {
    type: 'Institute',
    description: 'Increments the registration count for an institute',
    args: {
      instituteId: nonNull(stringArg()), // The ID of the institute where the user is registering
    },
    async resolve(_parent, { instituteId }, { prisma }) {
      // Fetch the current registration count
      const institute = await prisma.institute.findUnique({
        where: { id: instituteId },
      });

      if (!institute) {
        throw new Error('Institute not found');
      }

      // Increment the registration count
      return prisma.institute.update({
        where: { id: instituteId },
        data: {
          registrations: (institute.registrations || 0) + 1,
        },
      });
    },
  },
);
