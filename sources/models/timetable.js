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
        slotInfo: [{
            name: {
                type: String,
                required: true,
            },
            course: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: true,                
            },
            startTime: {
                type: String, // Time 24hr format. Example: "18:30:00". Timezone is IST(UTC+0530)
                required: true,
            },
            duration:{
                type: Number, // Units in minutes
                required: true,
            },
        }],
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