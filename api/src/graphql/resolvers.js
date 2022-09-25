import { GraphQLDateTime } from './scalars.js';

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    hello: () => 'Hello world!',
    name: () => 'Abhibhaw Asthana!',
  },
};

export default resolvers;
