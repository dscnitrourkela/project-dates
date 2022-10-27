import {
  idArg,
  list,
  nonNull,
  queryField,
} from 'nexus';

// import { checkGraphQLPermissions } from '../../helpers/auth/checkPermissions';

export const getDeveloperInfo = queryField('getDeveloperInfo', {
  type: 'DeveloperInfo',
  description: `Returns the information of a developer whose id is passed as an argument`,
  args: {
    id: nonNull(idArg()),
  },
  // authorize: (_parent, __args, ctx) =>
  //   checkGraphQLPermissions(ctx, [PERMISSIONS.SUPER_ADMIN]),
  resolve(_parent, args, { prisma }) {
    return prisma.developerInfo.findUnique({
      where: {
        id: args.id,
      },
    });
  },
});

export const getDeveloperInfos = queryField('getDeveloperInfos', {
  type: list('DeveloperInfo'),
  description: `Returns a list of all the developers of the application`,
  // authorize: (_parent, _args, ctx) => checkGraphQLPermissions(ctx, []),
  resolve(_parent, _args, ctx) {
    return ctx.prisma.developerInfo.findMany();
  },
});
