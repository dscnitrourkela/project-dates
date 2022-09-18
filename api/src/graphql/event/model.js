import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const EventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    description: String,
    startTime: {
      type: Date,
      required: [true, 'Please add a start time'],
    },
    durationInMin: {
      type: Number,
      required: true,
    },
    location: {
      required: true,
      type: String,
    },
    locationDesc: String,
    imageUrl: {
      type: String,
      required: true,
    },
    type: {
      required: true,
      enum: {
        values: ['ONET', 'WEEKLY'],
        message: 'Invalid event type, Allowed values are ONET, WEEKLY',
      },
    },
    category: {
      required: true,
      enum: {
        values: ['ACADEMIC', 'MESS', 'CLUB', 'INSTITUTE'],
        message:
          'Invalid event category. Allowed values are ACADEMIC, MESS, CLUB, INSTITUTE',
      },
    },
  },
  { timestamps: true },
);

export default model('Event', EventSchema);
