/** @format */

var mongoose = require('mongoose');
var permissionSchema = new mongoose.Schema({
	role: String,
	permissions: [String],
});

module.exports = mongoose.model('Permission', permissionSchema);
