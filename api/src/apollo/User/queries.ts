import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { booleanArg, idArg, list, nonNull, queryField, stringArg } from 'nexus';

export const user = queryField('user', {
  type: list('User'),
  description: 'Returns a list of users depending upon the parameters passed',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    id: idArg(),
    uid: idArg(),
    email: stringArg(),
    state: stringArg(),
    city: stringArg(),
    college: stringArg(),
    stream: stringArg(),
    referredBy: stringArg(),
    festID: list(nonNull(stringArg())),
    isNitrStudent: booleanArg(),
  },
  resolve(_parent, args, { prisma }) {
    const {
      id,
      uid,
      email,
      state,
      city,
      college,
      stream,
      referredBy,
      festID,
      isNitrStudent,
    } = args;

    if (id || uid || email) {
      return prisma.user.findMany({
        where: {
          id: id || undefined,
          email: email || undefined,
          uid: uid || undefined,
        },
      });
    }

    if (state || city || college || stream || referredBy || isNitrStudent) {
      return prisma.user.findMany({
        where: {
          state: state || undefined,
          city: city || undefined,
          college: college || undefined,
          stream: stream || undefined,
          referredBy: referredBy || undefined,
        },
      });
    }

    if (festID) {
      return prisma.user.findMany({
        where: {
          festID: {
            hasEvery: args.festID || [],
          },
        },
      });
    }

    return prisma.user.findMany();
  },
});
