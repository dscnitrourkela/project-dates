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
        // Create user with basic types;
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

        //Add nested types
        const userId = createdUser._id;
        const accessArray = user.clubAccess;
        await Promise.all(accessArray.map(async (accessItem,index)=>{
            const clubId=accessItem.club;
            const foundClub=await Clubs.findById(clubId);
            const accessObj={
                level:accessItem.level,
                club:foundClub._id,
                user:userId
            };
            let createdAccessLevel=await AccessLevel.create(accessObj);
            createdUser.clubAccess.push(createdAccessLevel);      
        }))                                       
        retPromise=await createdUser.save();           
        return retPromise;
    }
}
module.exports = UserAPI;