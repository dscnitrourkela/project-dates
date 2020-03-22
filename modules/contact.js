var mongoose = require("mongoose");
var contactSchema = new mongoose.Schema({
    name:String,
    designation:String,
    phone:String
})

module.exports = mongoose.model("Contact",contactSchema);