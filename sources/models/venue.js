var mongoose = require('mongoose');
var venueSchema = new mongoose.Schema({
  venueId: Number,
  name: String,
  description: String,
  link: String,
  picture: String,
});

module.exports = mongoose.model('Venue', venueSchema);
