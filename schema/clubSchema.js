const graphql = require('graphql');
const club=require("../models/club");

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;


const ClubType = new GraphQLObjectType({
    name: 'Club',
    fields: () => ({
        clubId : {type: GraphQLID},
        clubName : {type: GraphQLString},
        facAd : {type: GraphQLString},
        logo : {type: GraphQLString},
        events : {type: GraphQLString},
        society : {type: GraphQLString},
        domain : {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        club:{
            type:ClubType,
            args:{
                clubId:{type:GraphQLString}
            },
            resolve(parent,args){
                return club.find({});
            }
        }
    }
});





module.exports = new GraphQLSchema({
    query:RootQuery
});