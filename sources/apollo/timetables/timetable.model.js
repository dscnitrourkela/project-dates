// TODO: Update CBy and UBy to make it non-nullabe by design
// TODO: Add Professor

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
                type: String,  // Put slot name TA1 TA2 etc here. Not directly used now. May be useful later
                required: true,
                trim: true,
            },
            course: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
                required: true,                
            },
            startTime: {
                hours:{
                    type: Number,
                    required: true,
                    min: 0,
                    max: 23
                },
                minutes:{
                    type: Number,
                    required: true,
                    min: 0,
                    max: 59
                },
            },
            duration:{
                type: Number, // Units in minutes
                required: true,
                min: 0,
            },
            day: {
                type: Number, // 1-Monday, 5-Friday
                required: true,
                max: 5,
                min: 1
            }
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
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
        },
        updatedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false,
            default: null,
        },

    },
    {
        timestamps: true,
    },
);

module.exports = model('Timetable', timetableSchema);
