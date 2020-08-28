const users = require('../models/user.js');
const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class UserAPI extends DataSource{
    constructor(){
        super();
    }

    initialize(config){

    }

    getUsers(args){
        return users.find(args);
    }
    getUserById(id){
        return users.findById(id);
    }

    addUser(user){
        return users.create(user);
    }
}
module.exports=UserAPI;