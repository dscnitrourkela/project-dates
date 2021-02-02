const Users = require('../apollo/users/user.model.js');

const rolesPermissionsMap={
    "1":["users.Auth","users.all","users.Update","stories.view","users.byId","users.byName","users.Delete"],
    "2":["users.secretEvents"],
    "3":["stories.add","stories.delete"],
    "4":["clubs.update","clubs.delete"],
    "5":["clubs.add","accessLevels.CRUD"]
}

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