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
	instituteId: { type: String,
			validate: {
				validator: function(v) {
					var re = /^(1|2|3|4|5|7)[0-9][0-9]((AR|AS|BM|BT|CH|CE|CR|CS|CY|EC|EI|EE|ER|FP|HS|ID|LS|MA|ME|MN|MM|PA|PH|SM)|(ar|as|bm|bt|ch|ce|cr|cs|cy|ec|ei|ee|er|fp|hs|id|ls|ma|me|mn|mm|pa|ph|sm))[0-9]{4}$/;
					return (v == null || v.trim().length < 1) || re.test(v)
				},
				message: 'Provided institute ID is invalid.'
			}
	},
	address: String,
	mobile: String,
	emergencyContact: String,
	displayPicture: String,
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
