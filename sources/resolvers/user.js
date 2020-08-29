const queries={
    allUsers:(parent,args,{dataSources},info) => {
        return dataSources.UserAPI.getAllUsers();
    },
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

module.exports = {queries,mutations};