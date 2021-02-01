/** @format */

var mongoose = require('mongoose');
var venueSchema = new mongoose.Schema({
	venueId: Number,
	name: String,
	description: String,
	link: String,
	picture: String,
},{
    timestamps: true
});

module.exports = mongoose.models.Venue||mongoose.model('Venue', venueSchema);
