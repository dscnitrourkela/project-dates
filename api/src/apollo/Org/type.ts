import { objectType } from 'nexus';

export const Org = objectType({
  name: 'Org',
  description: 'Refers to the various groups creating several different events',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.nonNull.string('logo');
    t.string('tagline');
    t.string('coverImg');
    t.string('theme');
    t.id('festID');
    t.nonNull.int('registrationFee');
    t.date('startDate');
    t.date('endDate');
    t.nonNull.status('status');
    t.nonNull.orgSubType('orgSubType');
    t.nonNull.orgType('orgType');
    t.id('location');
  },
});
