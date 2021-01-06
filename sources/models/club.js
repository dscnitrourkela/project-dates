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
	links: String,	// social links array of objects {"fb"=>"fb link"} , presently keeping it in a JSON simple	
	backgroundColor: String, 
	contactInfo: [{ //An array which is expected to store just 2 contacts as per design
		name: String,
		designation: String,
		mobileNo: String,
		email: String
	}]
},{
    timestamps: true
});

module.exports = mongoose.model('Club', clubSchema);
