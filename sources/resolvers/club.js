/** @format */
const ERRORS = require('../errors');
const {resolverHelper} = require("../helpers/apollo");

const queries = {
	clubs: (parent, args, { dataSources }, info) => {
		return dataSources.ClubAPI.getClubs(args);
	},
	clubByName: (parent, { name }, { dataSources }, info) => {
		return dataSources.ClubAPI.getClubByName(name);
	},
	clubById: (parent, { id }, { dataSources }, info) => {
		return dataSources.ClubAPI.getClubById(id);
	},
	deleteClub: (parent, { id }, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'clubs.delete$'+id,permissions) 
			?  dataSources.ClubAPI.deleteClub(id)
			: ERRORS.PERMISSION_DENIED								
	},
};

const mutations = {
	addClub: (parent, { club }, { dataSources,permissions, error }, info) => {		
		return resolverHelper(error,'clubs.add',permissions) 
			?  dataSources.ClubAPI.addClub(club)
			: ERRORS.PERMISSION_DENIED		
	},
	updateClub: (parent, args, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'clubs.update$'+args.id,permissions) 
			?  dataSources.ClubAPI.updateClub(args)
			: ERRORS.PERMISSION_DENIED		
	}
};

const fieldResolvers = {
	Club: {
		memberAccess: async (parent, args, { dataSources }, info) => {
			return await dataSources.AccessLevelAPI.resolveAccess(parent.memberAccess);
		},
		events: async (parent, args, { dataSources }, info) => {
			return await dataSources.ClubAPI.resolveClubEvents(parent.events);
		},
	},
	ClubResult: {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : 'Club';
		},
	},
	ResponseResult: {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : 'Response';
		},
	},
};

module.exports = { queries, mutations, fieldResolvers };
