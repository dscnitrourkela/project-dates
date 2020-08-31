const queries={
    users:(parent,args,{dataSources},info) => {
        return dataSources.UserAPI.getUsers(args);
    },
    userByUsername:(parent,{username},{dataSources},info) =>{
        return dataSources.UserAPI.getUserByUsername(username);
    },
    userById:(parent,{id},{dataSources},info) =>{
        return dataSources.UserAPI.getUserById(id);
    },
}

const mutations={
    addUser:(parent,{user},{dataSources},info) =>{
        return dataSources.UserAPI.addUser(user);
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