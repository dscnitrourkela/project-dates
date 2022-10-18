import { objectType } from 'nexus';

export const DeveloperInfo = objectType({
  name: 'DeveloperInfo',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.id('github');
  },
});
