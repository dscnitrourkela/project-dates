import { mutationField, nonNull, stringArg } from 'nexus';

import { links } from './type';

export const createLink = mutationField('createLink', {
  type: 'Link',
  args: {
    description: nonNull(stringArg()),
    url: nonNull(stringArg()),
  },

  resolve(_parent, args) {
    const { description, url } = args;

    const idCount = links.length + 1;
    const link = {
      id: idCount,
      description,
      url,
    };
    links.push(link);
    return link;
  },
});
