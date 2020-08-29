const venues = require('../models/venue.js');
const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class VenueAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    getAllVenues(){
        return venues.find();
    }
    getVenues(args){
        return venues.find(args);
    }
    getVenueById(id){
        return venues.findById(id);
    }
    addVenue(venue){
        return venues.create(venue);
    }
}

module.exports = VenueAPI;