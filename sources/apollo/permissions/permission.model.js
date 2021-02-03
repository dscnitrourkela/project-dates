

var mongoose = require('mongoose');
var permissionSchema = new mongoose.Schema({
	role: String,
	permissions: [String],
},{
    timestamps: true
});

module.exports = mongoose.models.Club||mongoose.model('Permission', permissionSchema);
