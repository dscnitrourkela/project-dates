const { Schema, model } = require('mongoose');

const timetableSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        identifier: {
            type: String,
            required: true,
            trim: true,
        },
        /**
           Object {
           	slotName: Course._id,
            slotName: Course._id,
           }
        */
        slotInfo: {
            type: Object,
            required: true,
        },
        expiry: {
            type: Boolean,
            required: true,
            default: false,
        },
        schemaVersion: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
        },

    },
    {
        timestamps: true,
    },
);

module.exports = model('Timetable', timetableSchema);