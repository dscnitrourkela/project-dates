const Query= require("./resolvers/query");
// const Session= require("./resolvers/session");
const Mutation= require("./resolvers/mutation");

module.exports = {
    Query,
    Mutation,
    UserOrError:{
        __resolveType(obj){
            if(obj.code){
                return 'Error';
            }else{
                return 'User';
            }
        }
    }
};