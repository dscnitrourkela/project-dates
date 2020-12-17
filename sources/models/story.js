/** @format */

var mongoose = require('mongoose');
var storySchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Club',
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
	},
	asset: String,
	description:String
},{
    timestamps: true
});



module.exports = mongoose.model('Story', storySchema);
