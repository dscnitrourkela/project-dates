import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const UserCreateInputType = inputObjectType({
  name: 'UserCreateInputType',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('uid');
    t.string('name');
    t.string('photo');
    t.gender('gender');
    t.date('dob');
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('mobile');
    t.string('referredBy');
    t.string('rollNumber');
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInputType',
  definition(t) {
    t.string('name');
    t.string('photo');
    t.gender('gender');
    t.date('dob');
    t.string('state');
    t.string('city');
    t.string('college');
    t.string('stream');
    t.string('mobile');
    t.string('selfID');
    t.nonNull.list.nonNull.string('festID');
    t.string('referredBy');
    t.string('rollNumber');
  },
});

export const createUser = mutationField('createUser', {
  type: 'User',
  args: {
    user: nonNull('UserCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.create({
      data: args.user,
    });
  },
});

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    id: nonNull(idArg()),
    user: nonNull('UserUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    if (!args.id) {
      throw new Error('id is a required field');
    }

    return prisma.user.update({
      where: {
        id: args.id,
      },
      data: args.user,
    });
  },
});
