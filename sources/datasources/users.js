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
    async getUsers(args){
        return await Users.find(args);
    }
    async getUserById(id){
        return await Users.findById(id);
    }
    async getUserByUsername(username){
        return await Users.findOne({username:username});        
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
        if (accessArray != undefined && accessArray.length > 0) {
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
                foundClub.memberAccess.push(createdAccessLevel);
                await foundClub.save();    
            }))      
        }                                 
        retPromise=await createdUser.save();           
        return retPromise;
    }

    async updateUser(args){
        const userId=args.id;
        const user = args.user;
        let retPromise={};
        // Create user with basic types;
        const foundUser=await Users.findById(userId);
        const originalMemberAccess = foundUser.clubAccess.slice(0);
        
        let updatedUser = new Users(foundUser);
        updatedUser = Object.assign(updatedUser,user);
        updatedUser = new Users(updatedUser); 
        //Add nested types
        const accessArray = user.clubAccess;
        if (accessArray != undefined && accessArray.length > 0) {
            // accessArray exists and is not empty 
            await Promise.all(accessArray.map(async (accessItem,index)=>{
                const clubId=accessItem.club;
                const foundClub=await Clubs.findById(clubId);
                const accessObj={
                    level:accessItem.level,
                    club:foundClub._id,
                    user:userId
                };
                let createdAccessLevel=await AccessLevel.create(accessObj);
                updatedUser.clubAccess.push(createdAccessLevel._id);  
                foundClub.memberAccess.push(createdAccessLevel._id);
                await foundClub.save();    
            }))               
        }
                                 
        retPromise=await updatedUser.save();           
        return retPromise;
    }

    async deleteUser(id){
        const foundUser=await Users.findById(id);
        return await foundUser.remove();
    }
}
module.exports = UserAPI;