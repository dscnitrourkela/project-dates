import {GraphQLDateTime} from './scalars.js';

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    hello: () => {
      return 'Hello world!';
    },
    name: () => {
      return 'Abhibhaw Asthana!';
    },
  },
};

export default resolvers;
