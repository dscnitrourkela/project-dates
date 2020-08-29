const clubs = require('../models/club.js');
const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class ClubAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    getAllClubs(){
        return clubs.find();
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