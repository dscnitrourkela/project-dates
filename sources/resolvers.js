/** @format */

const Query = require('./resolvers/query');
const Mutation = require('./resolvers/mutation');
const FieldResolver = require('./resolvers/fieldResolver');
const { GraphQLDateTime } =require ("graphql-iso-date");

//Custom Resolver for Date object
const CustomScalarResolver = { 
  Date: GraphQLDateTime
};

const exportResolvers = {
	Query,
	Mutation
};
Object.assign(exportResolvers, FieldResolver);
Object.assign(exportResolvers, CustomScalarResolver);
module.exports = exportResolvers;
