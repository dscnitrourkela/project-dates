var mongoose = require("mongoose");
var venueSchema = new mongoose.Schema({
    venueId : Number,
    venueName : String,
    description : String,
    link : String,
    picture : String  
})

module.exports = mongoose.model("Venue",venueSchema);