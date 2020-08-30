const Query= require("./resolvers/query");
const Mutation= require("./resolvers/mutation");
const FieldResolver = require("./resolvers/fieldResolver");

exportResolvers = {
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
}
Object.assign( exportResolvers,FieldResolver );
module.exports = exportResolvers;