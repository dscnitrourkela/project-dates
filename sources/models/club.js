var mongoose = require("mongoose");
var clubSchema = new mongoose.Schema({
    clubName : String,
    clubMembers : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    facAd : String,
    logo : String,
    events : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Event"
        }
    ],
    society : String,
    domain : String 
})

module.exports = mongoose.model("Club",clubSchema);