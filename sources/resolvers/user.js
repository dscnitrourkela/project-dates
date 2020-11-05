const queries={
    users:(parent,args,{dataSources},info) => {
        return dataSources.UserAPI.getUsers(args);
    },
    /**
     * Resolver for User by Username.
     * @param {string} username - username query
     * @reutrns {Object} User - User with the queries username
     */
    userByUsername:(parent,{username},{dataSources,permissions},info) =>{
        if(permissions.find((permission)=>permission=="users.by"))
            return dataSources.UserAPI.getUserByUsername(username);
        else{
            const error=new Error("Permission Denied");
            error.code="ERROR401";
            throw error;
        }        
    },
    userById:(parent,{id},{dataSources,permissions},info) =>{   
        if(permissions.find((permission)=>permission=="users.byId"))
            return dataSources.UserAPI.getUserById(id);
        else{
            const error=new Error("Permission Denied");
            error.code="ERROR401";
            throw error;
        }
    },
}

const mutations={
    addUser:(parent,{user},{dataSources},info) =>{
        return dataSources.UserAPI.addUser(user);
    },
    updateUser:(parent,args,{dataSources},info) =>{
        return dataSources.UserAPI.updateUser(args);
    },
    deleteUser:(parent,{id},{dataSources},info) =>{
        return dataSources.UserAPI.deleteUser(id);
    }
}
const fieldResolvers = {
    User:{        
        clubAccess:async (parent,args,{dataSources},info)=>{
            return await dataSources.AccessLevelAPI.resolveAccess(parent.clubAccess);
        }
    },
}

module.exports = {queries,mutations,fieldResolvers};