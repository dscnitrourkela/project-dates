const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    name: String
  }
`;

module.exports = { typeDefs };
