/**
 * Seeding module
 *
 * @format
 * @module Permissions Helper
 */
const AccessLevels = require('../apollo/accessLevels/accessLevel.model');

/**
 * The roles to permissions map which has level-wise permissions list corresponding to the particular level.
 */
const rolesPermissionsMap={
    "1":["users.Auth","users.all","users.Update","stories.view","users.byId","users.byName","users.Delete"],
    "2":["users.secretEvents"],
    "3":["stories.add","stories.delete"],
    "4":["clubs.update","clubs.delete"],
    "5":["superuser.all"]
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
const populatePermissions = async id => {
    console.time("permission")
    const userAccessLevels = await AccessLevels.find({ user: id }).select({club:1,level:1}).lean()
    
    console.timeEnd("permission")
    if(userAccessLevels===null){
        throw new Error("User not found, Possibly outdated JWT")
    }else{        
        const permissions = [];
        userAccessLevels.forEach(accessObj => {
            if (accessObj.club) {
                rolesPermissionsMap[accessObj.level].forEach(perm => {
                    permissions.push(perm+"$"+accessObj.club)
                })                
            } else {
                rolesPermissionsMap[accessObj.level].forEach(perm => {
                    permissions.push(perm)
                })                
            }
        })
        return permissions;
    }    
    
}

module.exports= {
    populatePermissions
}