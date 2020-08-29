var mongoose = require("mongoose");
var accessLevelSchema = new mongoose.Schema({
    level : String,
    associatedClub : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club"
    },
    associatedUser : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }       

})

module.exports = mongoose.model("AccessLevel",accessLevelSchema);

