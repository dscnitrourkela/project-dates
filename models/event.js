var mongoose = require("mongoose");
var eventSchema = new mongoose.Schema({
    eventId : Number,
    organizerId :{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    eventName : String, 
    startDateTime : Date,    
    venueId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue"
    },
    endDateTime : Date,
    registrationPrice : Number,
    registrationCount : Number,
    otherDescription : String,
    attendees : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    announcements : [String],
    link : String,
    picture : String  
})

module.exports = mongoose.model("Event",eventSchema);