const graphql = require('graphql');
const User=require("../models/user");
const Club=require("../models/club");

const userSchema = require('./userSchema');
const clubSchema = require('./clubSchema');
const { schema } = require('../models/user');

const{
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;

const Types=[];
const Queries=[];
const Mutations=[];

const Schemas=[userSchema,clubSchema];

Schemas.forEach((s)=>{
    Types.push(s.Type);
    Queries.push(s.Query);
    Mutations.push(s.Mutation);
});


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        ${Types}
    }
});


const Mutation = new GraphQLObjectType({
    name: "Mutations",
    fields: {
        ${Mutations.join('\n')};
        
    },
  });





module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});