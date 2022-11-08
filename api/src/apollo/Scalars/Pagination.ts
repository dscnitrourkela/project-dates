import { inputObjectType } from 'nexus';

export const paginationInput = inputObjectType({
  name: 'paginationInputType',
  description: 'Input arguments used for pagination details',
  definition(t) {
    t.nonNull.int('skip', { default: 0 });
    t.nonNull.int('take', { default: 100 });
  },
});
