const { GraphQLDateTime } = require("./scalars");

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    hello: () => {
      return "Hello world!";
    },
    name: () => {
      return "Abhibhaw Asthana!";
    },
  },
};

module.exports = { resolvers };
