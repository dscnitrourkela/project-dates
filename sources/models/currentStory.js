/** @format */

var mongoose = require('mongoose');
var currentStorySchema = new mongoose.Schema({
	storyID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Story',
    },
    authorName: String, 
});

// currentStorySchema.index({ createdAt: { type: Date, expires: 86400 }}); // schema level


module.exports = mongoose.model('currentStory', currentStorySchema);
