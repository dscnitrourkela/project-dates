const graphql = require('graphql');
const user=require("../models/user");

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name : {type: GraphQLString},
        username : {type: GraphQLString},
        gmailAuthMail : {type: GraphQLString},
        firebaseToken : {type: GraphQLString},
        password : {type:GraphQLString},
        access : {

        },

        instituteId : {type: GraphQLString},
        mobile : {type: GraphQLInt},
        emergencyContact : {type: GraphQLInt},
        displayPicture : {type: GraphQLString},
    })
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        user:{
            type:UserType,
            args:{
                username:{type:GraphQLString}
            },
            resolve(parent,args){
                return user.find({});
            }
        },
    }
});





module.exports = new GraphQLSchema({
    query:RootQuery
});