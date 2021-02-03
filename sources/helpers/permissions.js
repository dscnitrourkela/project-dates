/**
 * Seeding module
 *
 * @format
 * @module Permissions Helper
 */
const Users = require('../apollo/users/user.model.js');

/**
 * The roles to permissions map which has level-wise permissions list corresponding to the particular level.
 */
const rolesPermissionsMap={
    "1":["users.Auth","users.all","users.Update","stories.view","users.byId","users.byName","users.Delete"],
    "2":["users.secretEvents"],
    "3":["stories.add","stories.delete"],
    "4":["clubs.update","clubs.delete"],
    "5":["clubs.add","accessLevels.CRUD"]
}

/**
 * This function populates all the permissions that user currently possess.
 * There could be two types of permissions
 * 1. That is associated with a club
 * The club id is encoded in the permission with $ as a delimiter
 *  (ex: clubs.update$1234resxdfty6)
 * 2. That is independent of club (ex: clubs.add)
 * 
 * @param {String} id Mongo User id
 */
const populatePermissions=async (id)=>{
    const foundUser= await Users.findById(id).populate("clubAccess");
    if(foundUser===null){
        throw new Error("User not found, Possibly outdated JWT")
    }else{
        let rolesSet=new Set();
        foundUser.clubAccess.forEach(accessObj => {
            if(accessObj.club)
                rolesSet.add(accessObj.level+"$"+accessObj.club)
            else
                rolesSet.add(accessObj.level);  
        }); 
        let permissions=[]
        for(let role of rolesSet){   
            const splits=role.split("$")     ;
            if(splits.length===1){
                rolesPermissionsMap[splits[0]].forEach(permission=>{
                    permissions.push(permission);
                })        
            }else if(splits.length===2){
                rolesPermissionsMap[splits[0]].forEach(permission=>{
                    permissions.push(permission+"$"+splits[1]);
                })        
            }        
        }
        return permissions;
    }    
}

module.exports= {
    populatePermissions
}