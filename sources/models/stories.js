var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
  storyId: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
  posted_at: String,  
  picture: String,
});

module.exports = mongoose.model('Event', eventSchema);
