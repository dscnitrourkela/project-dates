var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    name : String,
    username : String,
    gmailAuthMail : String ,
    // firebaseToken : String,
    // password : String,
    access : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AccessLevel"
    }],
    instituteId  : String ,
    address : String ,
    mobileNo : Number ,
    emergencyContact : Number ,
    displayPicture : String
})

module.exports = mongoose.model("User",userSchema);