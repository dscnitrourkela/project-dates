const queries={
    users:(parent,args,{dataSources},info) => {
        return dataSources.UserAPI.getUsers(args);
    },
    userByUsername:(parent,{username},{dataSources},info) =>{
        return dataSources.UserAPI.getUserByUsername(username);
    },
    userById:(parent,{id},{dataSourc0es},info) =>{
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
        clubs:async (parent,args,{dataSources},info)=>{
            return await dataSources.AccessLevelAPI.resolveClub(parent.clubs);
        }
    },
}

module.exports = {queries,mutations,fieldResolvers};