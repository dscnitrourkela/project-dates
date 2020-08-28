var mongoose = require("mongoose");
var accessLevelSchema = new mongoose.Schema({
    level : String,
    associatedClub : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Club"
    }        
})

module.exports = mongoose.model("AccessLevel",accessLevelSchema);

