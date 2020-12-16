/** @format */

var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
	eventId: Number,
	organizer: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Club',
	},
	eventName: String,
	startDateTime: String,
	venue: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Venue',
	},
	endDateTime: String,
	registrationPrice: Number,
	registrationCount: Number,
	otherDescription: String,
	attendees: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	announcements: String,
	link: String,
	picture: String,
},{
    timestamps: true
});

module.exports = mongoose.model('Event', eventSchema);
