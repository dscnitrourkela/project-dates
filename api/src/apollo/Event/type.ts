import { objectType } from 'nexus';

export const Event = objectType({
  name: 'Event',
  description:
    'Refers to the various events created by the different organisations',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('poster');
    t.nonNull.id('location');
    t.nonNull.date('startDate');
    t.nonNull.date('endDate');
    t.nonNull.list.nonNull.id('orgID');
    t.nonNull.orgType('orgType');
    t.nonNull.list.nonNull.string('string');
    t.nonNull.list.nonNull.id('poc');
    t.nonNull.boolean('weekly');
    t.repeatType('repeatDay');
    t.nonNull.int('priority');
  },
});
