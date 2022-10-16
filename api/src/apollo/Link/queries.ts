import { list, queryField } from 'nexus';

import { links } from './type';

export const getFeed = queryField('getFeed', {
  type: list('Link'),
  resolve() {
    return links;
  },
});
