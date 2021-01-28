/** @format */

const Query = require('./aggregateQuery');
const Mutation = require('./aggregateMutation');
const FieldResolver = require('./aggregateFieldResolver');
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
