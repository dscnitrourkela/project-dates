const Users = require('../models/user.js');

const rolesPermissionsMap={
    "1":["users.Auth","users.all","users.verify"]
}

const populatePermissions=async (id)=>{
    const foundUser= await Users.findById(id).populate("clubAccess");
    let rolesSet=new Set();
    foundUser.clubAccess.forEach(accessObj => {
        rolesSet.add(accessObj.level)
    }); 
    let permissions=[]
    for(let role of rolesSet){        
        rolesPermissionsMap[role].forEach(permission=>{
            permissions.push(permission)
        })        
    }
    return permissions;
}

module.exports= {
    populatePermissions
}