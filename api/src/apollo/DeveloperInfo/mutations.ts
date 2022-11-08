import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const DeveloperInfoCreateInputType = inputObjectType({
  name: 'DeveloperInfoCreateInputType',
  description: `Input arguments used in createDeveloperInfo mutation`,
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.id('github');
  },
});

export const createDeveloperInfo = mutationField('createDeveloperInfo', {
  type: 'DeveloperInfo',
  description: `Creates a new developer information record`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
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
  description: `Input arguments used in updateDeveloperInfo mutation`,
  definition(t) {
    t.string('name');
    t.id('github');
  },
});

export const updateDeveloperInfo = mutationField('updateDeveloperInfo', {
  type: 'DeveloperInfo',
  description: `Updates an existing developer information record`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
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
  description: `Deletes an existing developer information record`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
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
