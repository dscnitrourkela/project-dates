/** @format */

var mongoose = require('mongoose');
var clubSchema = new mongoose.Schema({
	clubName: String,
	memberAccess: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AccessLevel',
		},
	],
	facAd: String,
	logo: String,
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event',
		},
	],
	society: String,
	domain: String, //subdomain for clubs
	links: String,
	backgroundColor: String
	// social links array of objects {"fb"=>"fb link"}
	// background color
},{
    timestamps: true
});

module.exports = mongoose.model('Club', clubSchema);
