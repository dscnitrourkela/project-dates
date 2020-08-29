const clubs = require('../models/club.js');
const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class clubAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    getClubs(args){
        return clubs.find(args);
    }
    getClubById(id){
        return clubs.findById(id);
    }
    addClub(club){
        return clubs.create(club);
    }
}

module.exports = ClubAPI;