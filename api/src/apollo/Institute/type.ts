import { objectType } from 'nexus';

export const Institute = objectType({
  name: 'Institute',
  description: 'Institute or College participating in fest details',
  definition(t) {
    t.nonNull.string('id');
    t.nonNull.string('name');
    t.string('description');
    t.int('registrations');
    t.status('status');
    t.date('createdAt');
    t.date('updatedAt');
  },
});
