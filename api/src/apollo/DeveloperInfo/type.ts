import { objectType } from 'nexus';

export const DeveloperInfo = objectType({
  name: 'DeveloperInfo',
  description: `Refers to the various developers of the Avenue Application including the backend, frontend and mobile team`,
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.id('github');
  },
});
