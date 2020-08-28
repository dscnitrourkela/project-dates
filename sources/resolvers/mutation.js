module.exports = {
    addUser:(parent,{user},{dataSources},info) =>{
        return dataSources.UserAPI.addUser(user);
    }
};