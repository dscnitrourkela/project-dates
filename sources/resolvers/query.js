module.exports = {
    users:(parent,args,{dataSources},info) => {
        return dataSources.UserAPI.getUsers();
    },
    userById:(parent,{id},{dataSources},info) =>{
        return dataSources.UserAPI.getUserById(id);
    }
};