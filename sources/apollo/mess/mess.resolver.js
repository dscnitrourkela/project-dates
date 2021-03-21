/** @format */
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const queries = {
	messList: (_, __, { dataSources }, ___) => dataSources.MessAPI.getMessList(),

	menuByMess: (_, args, { dataSources }, __) => dataSources.MessAPI.getMenuByMess(args.id, args.isVeg),
};

const mutations = {};

const fieldResolvers = {};

module.exports = { queries, mutations, fieldResolvers };
