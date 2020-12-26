const Users = require('../models/user.js');

const rolesPermissionsMap={
    "1":["users.Auth","users.all","users.Update"],
    "2":["users.secretEvents"],
    "3":["stories.add"]
}

const populatePermissions=async (id)=>{
    const foundUser= await Users.findById(id).populate("clubAccess");
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
        console.log(splits);
        if(splits.length==1){
            rolesPermissionsMap[splits[0]].forEach(permission=>{
                permissions.push(permission);
            })        
        }else if(splits.length==2){
            rolesPermissionsMap[splits[0]].forEach(permission=>{
                permissions.push(permission+"$"+splits[1]);
            })        
        }
        
    }
    return permissions;
}

module.exports= {
    populatePermissions
}