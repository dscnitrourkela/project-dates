const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class AccessLevelAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    async resolveUser(userArray){
        return await accessLevel.find({
            '_id': { $in: userArray}
        });
    }
    async resolveClub(clubArray){
        console.log(clubArray)
        return await accessLevel.find({
            '_id': { $in: clubArray}
        });
    }    
}

module.exports = AccessLevelAPI;