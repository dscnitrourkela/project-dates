const Venues = require('../models/venue.js');
const AccessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class VenueAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    getVenues(args){
        return Venues.find(args);
    }
    getVenueById(id){
        return Venues.findById(id);
    }
    async addVenue(venue){
        let createdVenue= new Venues(venue);
        return await createdVenue.save();
    }
}

module.exports = VenueAPI;