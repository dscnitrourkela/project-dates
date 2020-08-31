const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class AccessLevelAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    async resolveAccess(accessArray){
        return await accessLevel.find({
            '_id': { $in: accessArray}
        });
    } 
}

module.exports = AccessLevelAPI;