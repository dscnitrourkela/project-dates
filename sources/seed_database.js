const user=require("./models/user");
const event=require("./models/event");
const accessLevel=require("./models/accessLevel");
const club=require("./models/club");
const venue=require("./models/venue");

club.create({
    {
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
    }
})