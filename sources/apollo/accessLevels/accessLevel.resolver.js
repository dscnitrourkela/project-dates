const queries = {};
const ERRORS = require('../../errors');
const {resultResolver,resolverHelper}=require('../../helpers/apollo');

const mutations = {
	addAccessLevel: (parent, { accessLevel }, { dataSources, permissions, error }) => 
		resolverHelper(error,'accessLevels.CRUD',permissions) 
			? dataSources.AccessLevelAPI.addAccessLevel(accessLevel)
			: ERRORS.PERMISSION_DENIED					
	,
	updateAccessLevel: (parent, args, { dataSources, permissions, error }) => 
		resolverHelper(error,'accessLevels.CRUD',permissions) 
			? dataSources.AccessLevelAPI.updateAccessLevel(args)
			: ERRORS.PERMISSION_DENIED		
	,
	deleteAccessLevel: (parent, { id }, { dataSources, permissions, error }) => 
		resolverHelper(error,'accessLevels.CRUD',permissions) 
			? dataSources.AccessLevelAPI.deleteAccessLevel(id)
			: ERRORS.PERMISSION_DENIED						
	,
};

const fieldResolvers = {
	AccessLevel: {
		user: (parent, args, { dataSources }) => 
			dataSources.UserAPI.getUserById(parent.user)
		,
		club: (parent, args, { dataSources },) =>
			dataSources.ClubAPI.getClubById(parent.club)
		,
		// if(permissions.find(permission=>permission=="users.by"))
		//     return await dataSources.ClubAPI.getClubById(parent.club);
		// else{
		//     const error=new Error("Permission Denied for club field");
		//     error.code="ERROR401";
		//     throw error;
		// }
	},
	AccessLevelResponse:resultResolver("AccessLevel")
};

module.exports = { queries, mutations, fieldResolvers };