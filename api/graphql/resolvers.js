const resolvers = {
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
