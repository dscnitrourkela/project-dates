import { idArg, inputObjectType, mutationField, nonNull } from 'nexus';

export const OrgCreateInputType = inputObjectType({
  name: 'OrgCreateInputType',
  definition(t) {
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.status('logo');
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
  nonNullDefaults: {
    input: false,
  },
  definition(t) {
    t.string('name');
    t.string('description');
    t.status('logo');
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
