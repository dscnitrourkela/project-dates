/** @format */

var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
	name: String,
	username: String,
	gmailAuthMail: String,
	firebaseUID : { type : String , unique : true,dropDups: true },
	clubAccess: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'AccessLevel',
		},
	],
	instituteId: String,
	address: String,
	mobileNo: Number,
	emergencyContact: Number,
	displayPicture: String,
});

module.exports = mongoose.model('User', userSchema);
