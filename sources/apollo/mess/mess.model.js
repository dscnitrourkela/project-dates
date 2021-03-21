/** @format */

// TODO: Update CBy and UBy to make it non-nullabe by design

const { Schema, model } = require('mongoose');

const itemSchema = new Schema({
	dish: {
		type: String,
		required: true,
	},
	isVeg: {
		type: Boolean,
		required: true,
	},
});

const mealSchema = new Schema({
	mainCourse: {
		type: [itemSchema],
		required: true,
	},
	selectableDish: {
		type: [itemSchema],
		required: true,
	},
	commonDish: {
		type: [itemSchema],
		required: true,
	},
});

const messSchema = new Schema({
	messName: {
		type: String,
		required: true,
		enum: ['VS', 'SD', 'GDB/MV', 'DBA/MSS', 'HB', 'CVR', 'KMS'],
	},
	menu: {
		type: [
			{
				day: {
					type: Number,
					max: 6,
					min: 0,
				},
				breakfast: {
					type: mealSchema,
					required: true,
				},
				lunch: {
					type: mealSchema,
					required: true,
				},
				snacks: {
					type: mealSchema,
					required: true,
				},
				dinner: {
					type: mealSchema,
					required: true,
				},
			},
		],
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
});

module.exports = model('Mess', messSchema);
