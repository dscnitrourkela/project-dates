const queries = {};
const ERRORS = require('../../errors');
const {resultResolver,resolverHelper}=require('../../helpers/apollo');

const mutations = {
	addAccessLevel: (parent, { accessLevel }, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'accessLevels.CRUD',permissions) 
			?  dataSources.AccessLevelAPI.addAccessLevel(accessLevel)
			: ERRORS.PERMISSION_DENIED					
	},
	updateAccessLevel: (parent, args, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'accessLevels.CRUD',permissions) 
			?  dataSources.AccessLevelAPI.updateAccessLevel(args)
			: ERRORS.PERMISSION_DENIED		
	},
	deleteAccessLevel: (parent, { id }, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'accessLevels.CRUD',permissions) 
			?  dataSources.AccessLevelAPI.deleteAccessLevel(id)
			: ERRORS.PERMISSION_DENIED						
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
	AccessLevelResponse:resultResolver("AccessLevel")
};

module.exports = { queries, mutations, fieldResolvers };