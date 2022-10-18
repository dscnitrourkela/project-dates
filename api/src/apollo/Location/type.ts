import { objectType } from 'nexus';

export const Location = objectType({
  name: 'Location',
  description: 'Refers to the various locations present in NITR',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.string('name');
    t.nonNull.string('description');
    t.float('lat');
    t.float('long');
  },
});
