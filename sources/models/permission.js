/** @format */

var mongoose = require('mongoose');
var permissionSchema = new mongoose.Schema({
	role: String,
	permissions: [String],
},{
    timestamps: true
});

module.exports = mongoose.model('Permission', permissionSchema);
