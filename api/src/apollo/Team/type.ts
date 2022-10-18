import { objectType } from 'nexus';

export const Team = objectType({
  name: 'Team',
  description: 'Refers to the team member part of a particular event',
  definition(t) {
    t.nonNull.id('id');
    t.string('position');
    t.string('team');
    t.nonNull.id('userID');
    t.nonNull.id('orgID');
    t.int('priority');
  },
});
