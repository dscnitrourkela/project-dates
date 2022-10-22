import { objectType } from 'nexus';

export const Story = objectType({
  name: 'Story',
  description: 'Refers to the various stories put by various',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.id('orgID');
    t.nonNull.string('image');
    t.string('linkTo');
  },
});
