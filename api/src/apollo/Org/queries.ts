import { idArg, list, queryField } from 'nexus';

export const org = queryField('org', {
  type: list('Org'),
  description:
    'Returns a list of all the organisations depending upon the arguments',
  args: {
    id: idArg(),
    orgType: 'OrgType',
    orgSubType: 'OrgSubType',
  },
  resolve(_parent, args, { prisma }) {
    const { id, orgType, orgSubType } = args;

    if (id || orgType || orgSubType) {
      return prisma.org.findMany({
        where: {
          id: id || undefined,
          orgType: orgType || undefined,
          orgSubType: orgSubType || undefined,
        },
      });
    }

    return prisma.org.findMany();
  },
});
