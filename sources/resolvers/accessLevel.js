/** @format */

const queries = {};
const ERRORS = require('../errors');
const {responseResolver}=require('../helpers/apollo');

const mutations = {
	addAccessLevel: (parent, { accessLevel }, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'accessLevels.CRUD')) {
			return dataSources.AccessLevelAPI.addAccessLevel(accessLevel);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}		
	},
	updateAccessLevel: (parent, args, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'accessLevels.CRUD')) {
			return dataSources.AccessLevelAPI.updateAccessLevel(args);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}				
	},
	deleteAccessLevel: (parent, { id }, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'accessLevels.CRUD')) {
			return dataSources.AccessLevelAPI.deleteAccessLevel(id);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}		
	},
};

const fieldResolvers = {
	AccessLevel: {
		user: async (parent, args, { dataSources }, info) => {
			return await dataSources.UserAPI.getUserById(parent.user);
		},
		club: async (parent, args, { dataSources }, info) => {
			// if(permissions.find((permission)=>permission=="users.by"))
			//     return await dataSources.ClubAPI.getClubById(parent.club);
			// else{
			//     const error=new Error("Permission Denied for club field");
			//     error.code="ERROR401";
			//     throw error;
			// }
			return await dataSources.ClubAPI.getClubById(parent.club);
		},
	},
	AccessLevelResponse:responseResolver("AccessLevel")
};

module.exports = { queries, mutations, fieldResolvers };
