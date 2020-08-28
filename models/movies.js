var mongoose = require("mongoose");
var movieSchema = new mongoose.Schema({
    title: String,
    date: Date,
    seats: Object    
});
module.exports = mongoose.model("movie",movieSchema);