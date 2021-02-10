

const mongoose = require('mongoose');
const storySchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Club',
	},
	event: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Event',
	},
	asset: String,
	assetType: String,
	description:String
},{
    timestamps: true
});



module.exports = mongoose.models.Story||mongoose.model('Story', storySchema);
