import { PERMISSIONS } from 'constants/auth';
import { checkGqlPermissions } from 'helpers/auth/checkPermissions';
import {
  idArg,
  inputObjectType,
  mutationField,
  nonNull,
  list,
  stringArg,
} from 'nexus';

export const OrgCreateInputType = inputObjectType({
  name: 'OrgCreateInputType',
  description: 'Input arguments used in the createOrg mutation',
  definition(t) {
    t.nonNull.string('name');
    t.string('description');
    t.string('logo');
    t.string('tagline');
    t.string('coverImg');
    t.string('theme');
    t.id('festID');
    t.int('registrationFee', { default: 0 });
    t.date('startDate');
    t.date('endDate');
    t.status('status');
    //    t.collegeStatus('college_status');
    t.orgSubType('orgSubType');
    t.nonNull.orgType('orgType');
    t.id('locationID');
  },
});

// Mutation for adding multiple orgs/Institues at once
export const createMultipleOrgs = mutationField('createMultipleOrgs', {
  type: list('Org'),
  description: 'Creates multiple organisation records at once',
  authorize: (_parent, _args, ctx) => checkGqlPermissions(ctx, []),
  args: {
    orgs: nonNull(list(nonNull('OrgCreateInputType'))), // Expect an array of org input objects
  },
  async resolve(_parent, args, { prisma }) {
    const createdOrgs = [];

    // Loop over each organization input and create it in the database
    for (const org of args.orgs) {
      const createdOrg = await prisma.org.create({
        data: org,
      });
      createdOrgs.push(createdOrg);
    }

    return createdOrgs;
  },
});

// Original single-org mutation retained for individual creation
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

// Update mutation for updating existing organizations
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

// Original update org mutation retained
export const updateOrg = mutationField('updateOrg', {
  type: 'Org',
  description: 'Updates an existing organisation record',
  authorize: (_parent, args, ctx) => checkGqlPermissions(ctx, [], args.id),
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

// Increment the `registrations` field for a specific org
export const incrementOrgRegistration = mutationField(
  'incrementOrgRegistration',
  {
    type: 'Org',
    description: 'Increments the registration count for an organisation',
    args: {
      orgId: nonNull(stringArg()), // The ID of the organisation where the user is registering
    },
    async resolve(_parent, { orgId }, { prisma }) {
      const org = await prisma.org.findUnique({
        where: { id: orgId },
      });

      if (!org) {
        throw new Error('Organisation not found');
      }

      return prisma.org.update({
        where: { id: orgId },
        data: {
          registrations: (org.registrations || 0) + 1,
        },
      });
    },
  },
);
