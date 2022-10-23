import { objectType } from 'nexus';

export const Story = objectType({
  name: 'Story',
  description: 'Refers to the various stories put by various',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('image');
    t.string('linkTo');

    t.nonNull.id('orgID');
    t.nonNull.field('org', {
      type: 'Org',
      async resolve(parent, _arg, { prisma }) {
        const org = await prisma.org.findUnique({
          where: {
            id: parent.orgID,
          },
        });

        if (!org) throw new Error('Org not found');
        return org;
      },
    });
  },
});
