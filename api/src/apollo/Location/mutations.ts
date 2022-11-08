import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const LocationCreateInputType = inputObjectType({
  name: 'LocationCreateInputType',
  description: `Input arguments used in createLocation mutation`,
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.float('lat');
    t.float('long');
  },
});

export const createLocation = mutationField('createLocation', {
  type: 'Location',
  description: `Creates a new location record`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
  args: {
    location: nonNull('LocationCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.location.create({
      data: args.location,
    });
  },
});

export const LocationUpdateInputType = inputObjectType({
  name: 'LocationUpdateInputType',
  description: `Input arguments used in updateLocation mutation`,
  definition(t) {
    t.string('name');
    t.string('description');
    t.float('lat');
    t.float('long');
  },
});

export const updateLocation = mutationField('updateLocation', {
  type: 'Location',
  description: 'Updates the existing Location record',
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
  args: {
    id: nonNull(idArg()),
    location: nonNull('LocationUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.location.update({
      where: {
        id: args.id,
      },
      data: {
        ...args.location,
        name: args.location?.name || undefined,
        description: args.location?.description || undefined,
      },
    });
  },
});

export const deleteLocation = mutationField('deleteLocation', {
  type: 'Location',
  description: `Deletes an existing location record`,
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [
      PERMISSIONS.SUPER_ADMIN,
      PERMISSIONS.SUPER_EDITOR,
    ]),
  args: {
    id: nonNull(idArg()),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.location.delete({
      where: {
        id: args.id,
      },
    });
  },
});
