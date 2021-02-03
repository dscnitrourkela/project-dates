var mongoose = require('mongoose');
var clubSchema = new mongoose.Schema({
	clubName: String,
	memberAccess: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AccessLevel',
		},
	],
	description: String,
	facAd: String,
	theme:[{
		_id:false,
		name:String,
		logo: String,
		backgroundColor: String, 
	}],
	events: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Event',
		},
	],
	society: String,
	domain: String, //subdomain for clubs
	links: [{
		link:String,	
		name:String
	}],	// social links array of objects {"fb"=>"fb link"} , presently keeping it in a JSON simple	
	
	contactInfo: [{ //An array which is expected to store just 2 contacts as per design
		name: String,
		designation: String,
		mobileNo: String,
		email: String
	}]
},{
    timestamps: true
});

module.exports = mongoose.models.Club||mongoose.model('Club', clubSchema);
