import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar DateTime

  type Query {
    hello: String
    name: String
    events: [Event]
  }
  type Event {
    id: ID!
    type: EventType!
    name: String!
    description: String
    category: EventCategory!
    startTime: DateTime!
    locationDesc: String
    durationInMin: Int!
    location: String!
    image: String!
  }
  enum EventType {
    ONET
    WEEKLY
  }
  enum EventCategory {
    ACADEMIC
    MESS
    CLUB
    INSTITUTE
  }
`;

export default typeDefs;
