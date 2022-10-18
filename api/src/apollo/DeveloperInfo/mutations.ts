import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const DeveloperInfoCreateInputType = inputObjectType({
  name: 'DeveloperInfoCreateInputType',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.id('github');
  },
});

export const createDeveloperInfo = mutationField('createDeveloperInfo', {
  type: 'DeveloperInfo',
  args: {
    developerInfo: nonNull('DeveloperInfoCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.developerInfo.create({
      data: args.developerInfo,
    });
  },
});

export const DeveloperInfoUpdateInputType = inputObjectType({
  name: 'DeveloperInfoUpdateInputType',
  definition(t) {
    t.string('name');
    t.id('github');
  },
});

export const updateDeveloperInfo = mutationField('updateDeveloperInfo', {
  type: 'DeveloperInfo',
  args: {
    id: nonNull(idArg()),
    developerInfo: nonNull('DeveloperInfoUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.developerInfo.update({
      where: {
        id: args.id,
      },
      data: {
        name: args.developerInfo?.name || undefined,
        github: args.developerInfo?.github || undefined,
      },
    });
  },
});

export const deleteDeveloperInfo = mutationField('deleteDeveloperInfo', {
  type: 'DeveloperInfo',
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.developerInfo.delete({
      where: {
        id: args.id,
      },
    });
  },
});
