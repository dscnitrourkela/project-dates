var mongoose = require('mongoose');
var accessLevelSchema = new mongoose.Schema({
  level: String,
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('AccessLevel', accessLevelSchema);
