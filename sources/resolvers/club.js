/** @format */
const ERRORS = require('../errors');

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
	deleteClub: (parent, { id }, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'clubs.delete$'+id)) {
			return dataSources.ClubAPI.deleteClub(id);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}						
	},
};

const mutations = {
	addClub: (parent, { club }, { dataSources,permissions }, info) => {		
		if (permissions.find((permission) => permission == 'clubs.add')) {
			return dataSources.ClubAPI.addClub(club);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}		
	},
	updateClub: (parent, args, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'clubs.update$'+args.id)) {
			return dataSources.ClubAPI.updateClub(args);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}				
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
