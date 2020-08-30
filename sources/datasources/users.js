const Users = require('../models/user.js');
const Clubs = require('../models/club.js');
const AccessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class UserAPI extends DataSource{
    constructor(){
        super();
    }

    initialize(config){

    }
    getUsers(args){
        return Users.find(args);
    }
    getUserById(id){
        return Users.findById(id);
    }
    getUserByUsername(username){
        return Users.find({username:username});
    }

    async addUser(user){
        let retPromise={};
        const clubId=user.access[0].associatedClubId;
        const foundClub=await Clubs.findById(clubId);
        let createdUser=await Users.create({
            username: user.username,
            name: user.name,
            gmailAuthMail: user.gmailAuthMail,                        
            instituteId: user.instituteId,
            address: user.address,
            mobile: user.mobile,
            emergencyContact: user.emergencyContact,
            displayPicture: user.displayPicture                        
        });
        let userId=createdUser._id;
        const accessObj={
            level:user.access[0].accessLevel,
            associatedClub:foundClub
        };
        let createdAccessLevel=await AccessLevel.create(accessObj);
        createdUser.access.push(createdAccessLevel);                                                
        retPromise=await createdUser.save();
        // console.log(retPromise);            
        return retPromise;
    }
}
module.exports = UserAPI;