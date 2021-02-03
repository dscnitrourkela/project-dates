var mongoose = require('mongoose');
var accessLevelSchema = new mongoose.Schema({
	level: String,
	name: String,
	relation:String,
	club: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Club',
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
},{
    timestamps: true
});

module.exports = mongoose.models.AccessLevel||mongoose.model('AccessLevel', accessLevelSchema);
