// import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { inputObjectType, mutationField, nonNull } from 'nexus';

export const UserCreateInputType = inputObjectType({
  name: 'UserCreateInputType',
  description: 'Input arguments used in createUser mutation',
  definition(t) {
    t.nonNull.string('email');
    t.nonNull.string('uid');
    t.string('name');
    t.string('college');
    t.nonNull.string('mobile');
    t.string('rollNumber');
    t.date('createdAt');
    t.string('tSize');
    t.string('srcID');
    t.string('idCardPhoto');
    t.string('aicheRegID');
  },
});

export const createUser = mutationField('createUser', {
  type: 'User',
  description: 'Creates a new user record',
  authorize: (_parent, _args) => true,
  // authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    user: nonNull('UserCreateInputType'),
  },
  async resolve(_parent, args, { prisma }) {
    const isMobileValid = args.user.mobile?.length === 10;
    const isEmailValid = args.user.email
      .toLowerCase()
      .match(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/);

    if (!isEmailValid) throw new Error('Invalid Email, please try again');
    if (!isMobileValid)
      throw new Error('Invalid Mobile Number, please try again');

    if (args.user.rollNumber) {
      const users = await prisma.user.findMany({
        where: {
          rollNumber: args.user.rollNumber,
          email: args.user.email,
          uid: args.user.uid,
          mobile: args.user.mobile,
        },
      });

      if (users.length > 0) {
        throw new Error('Roll Number already registered');
      }
    }

    return prisma.user.create({
      data: {
        ...args.user,
        selfID: args.user?.mobile,
      },
    });
  },
});
