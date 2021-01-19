// TODO: Update CBy and UBy to make it non-nullabe by design
const { Schema, model } = require('mongoose');

const courseSchema = new Schema(
    {
        subjectCode:{
            type: String, 
            required: true,
            trim: true,
        },
        name:{
            type: String, 
            required: true,
            trim: true,
        },
        ltp:{
            lecture:{
                type: Number,
                required: true,
                min: 0,
            },
            tutorial:{
                type: Number,
                required: true,
                min: 0,
            },
            practical:{
                type: Number,
                required: true,
                min: 0,
            }
        },
        credits:{
            type: Number,
            required: true,
            min: 0,
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

module.exports = model('Course', courseSchema);
