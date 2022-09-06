import mongoose from 'mongoose';

const {Schema, model} = mongoose;

const EventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  startTime: Date,
});

export default model('Event', EventSchema);

// id: ID!
//     type: EventType!
//     name: String!
//     description: String
//     category: EventCategory!
//     startTime: DateTime!
//     locationDesc: String
//     durationInMin: Int!
//     location: String!
//     image: String!
