import { objectType } from 'nexus';
import { NexusGenObjects } from 'nexus_generated/nexus-typegen';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.nonNull.int('id');
    t.nonNull.string('description');
    t.nonNull.string('url');
  },
});

export const links: NexusGenObjects['Link'][] = [
  {
    id: 1,
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 2,
    url: 'graphql.org',
    description: 'GraphQL official website',
  },
];
