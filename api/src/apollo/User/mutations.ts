import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const UserCreateInputType = inputObjectType({
  name: 'UserCreateInputType',
  description: 'Input arguments used in createUser mutation',
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

export const createUser = mutationField('createUser', {
  type: 'User',
  description: 'Creates a new user record',
  args: {
    user: nonNull('UserCreateInputType'),
  },
  /**
   * TODO: add validations on
   * - email
   * - mobile
   */
  resolve(_parent, args, { prisma }) {
    return prisma.user.create({
      data: args.user,
    });
  },
});

export const UserUpdateInputType = inputObjectType({
  name: 'UserUpdateInputType',
  description: 'Input arguments used in updateUser mutation',
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
    t.nonNull.list.nonNull.id('festID');
    t.string('referredBy');
    t.string('rollNumber');
  },
});

export const updateUser = mutationField('updateUser', {
  type: 'User',
  description: 'Updates an existing user record',
  args: {
    id: nonNull(idArg()),
    user: nonNull('UserUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.user.update({
      where: { id: args.id },
      data: args.user,
    });
  },
});
