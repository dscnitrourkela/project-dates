import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const OrgCreateInputType = inputObjectType({
  name: 'OrgCreateInputType',
  description: 'Input arguments used in the createOrg mutation',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.string('logo');
    t.string('tagline');
    t.string('coverImg');
    t.string('theme');
    t.id('festID');
    t.nonNull.int('registrationFee', { default: 0 });
    t.date('startDate');
    t.date('endDate');
    t.nonNull.status('status');
    t.nonNull.orgSubType('orgSubType');
    t.nonNull.orgType('orgType');
    t.id('locationID');
  },
});

export const createOrg = mutationField('createOrg', {
  type: 'Org',
  description: 'Creates a new organisation record',
  authorize: (_parent, _args, ctx) =>
    checkGqlPermissions(ctx, [PERMISSIONS.SUPER_ADMIN]),
  args: {
    org: nonNull('OrgCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.org.create({
      data: args.org,
    });
  },
});

export const OrgUpdateInputType = inputObjectType({
  name: 'OrgUpdateInputType',
  description: 'Input arguments used in the updateOrg mutation',
  nonNullDefaults: {
    input: false,
  },
  definition(t) {
    t.string('name');
    t.string('description');
    t.string('logo');
    t.string('tagline');
    t.string('coverImg');
    t.string('theme');
    t.int('registrationFee');
    t.date('startDate');
    t.date('endDate');
    t.status('status');
    t.orgSubType('orgSubType');
    t.orgType('orgType');
    t.id('locationID');
  },
});

export const updateOrg = mutationField('updateOrg', {
  type: 'Org',
  description: 'Updates an existing organisation record',
  authorize: (_parent, args, ctx) =>
    checkGqlPermissions(
      ctx,
      [
        PERMISSIONS.SUPER_ADMIN,
        PERMISSIONS.SUPER_EDITOR,
        PERMISSIONS.ORG_ADMIN,
        PERMISSIONS.ORG_EDITOR,
      ],
      args.id,
    ),
  args: {
    id: nonNull(idArg()),
    org: nonNull('OrgUpdateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    const {
      name,
      description,
      logo,
      registrationFee,
      status,
      orgSubType,
      orgType,
      tagline,
      coverImg,
      theme,
      startDate,
      endDate,
      locationID,
    } = args.org;

    return prisma.org.update({
      where: {
        id: args.id,
      },
      data: {
        name: name || undefined,
        description: description || undefined,
        logo: logo || undefined,
        registrationFee: registrationFee || undefined,
        status: status || undefined,
        orgSubType: orgSubType || undefined,
        orgType: orgType || undefined,
        tagline: tagline || undefined,
        coverImg: coverImg || undefined,
        theme: theme || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        locationID: locationID || undefined,
      },
    });
  },
});
