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
    t.id('location');
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
    t.id('location');
  },
});

export const createOrg = mutationField('createOrg', {
  type: 'Org',
  description: 'Creates a new organisation record',
  args: {
    org: nonNull('OrgCreateInputType'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.org.create({
      data: args.org,
    });
  },
});

export const updateOrg = mutationField('updateOrg', {
  type: 'Org',
  description: 'Updates an existing organisation record',
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
      location,
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
        location: location || undefined,
      },
    });
  },
});
