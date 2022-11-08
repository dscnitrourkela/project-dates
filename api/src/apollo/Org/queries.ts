import { idArg, list, queryField } from 'nexus';

export const org = queryField('org', {
  type: list('Org'),
  description:
    'Returns a list of all the organisations depending upon the arguments',
  args: {
    id: idArg(),
    orgType: 'OrgType',
    orgSubType: 'OrgSubType',
    pagination: 'paginationInputType',
  },
  resolve(_parent, args, { prisma }) {
    const { id, orgType, orgSubType, pagination } = args;

    if (id || orgType || orgSubType) {
      return prisma.org.findMany({
        skip: pagination?.skip,
        take: pagination?.take,
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
