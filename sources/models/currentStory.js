/** @format */

var mongoose = require('mongoose');
var currentStorySchema = new mongoose.Schema({
	authorId: String,
	authorName: String, 
	authorLogo: [{
		name:String,
		logo: String,
	}],
	story:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Story',
	},
},{
	timestamps:true
});

// currentStorySchema.index({ createdAt: { type: Date, expires: 86400 }}); // schema level


module.exports = mongoose.model('currentStory', currentStorySchema);
