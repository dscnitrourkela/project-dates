const venues = require('../models/venue.js');
const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class venueAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

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