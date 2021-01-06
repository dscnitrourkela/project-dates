/** @format */

const ERRORS = require('../errors');

const queries = {
	users: (parent, args, { dataSources,permissions }, info) => {
		if (permissions.find((permission) => permission == 'users.all')) {
			return dataSources.UserAPI.getUsers(args);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}
	},
	/**
	 * Resolver for User by Username.
	 * @param {string} username - username query
	 * @reutrns {Object} User - User with the queries username
	 */
	userByUsername: async (parent, { username }, { dataSources,uid, permissions }, info) => {
		if (permissions.find((permission) => permission == 'users.byName')) {
			return dataSources.UserAPI.getUserByUsername(username);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}
	},
	userById: async (parent, { id }, {dataSources,uid, permissions }, info) => {
		if (permissions.find((permission) => permission == 'users.byId')) {
			return dataSources.UserAPI.getUserById(id);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}
	},
};

const mutations = {
	authUser: (parent, { user }, { dataSources,uid, permissions}, info) => {
		if (permissions.find((permission) => permission == 'users.Auth')) {
			return dataSources.UserAPI.authUser(user,uid);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}		
	},
	updateUser: (parent, args, { dataSources,uid, permissions}, info) => {
		if (permissions.find((permission) => permission == 'users.Update')) {
			return dataSources.UserAPI.updateUser(args,uid);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}			
	},
	deleteUser: (parent, args, { dataSources,uid, permissions}, info) => {
		return dataSources.UserAPI.deleteUser(uid);
	},
};
const fieldResolvers = {
	User: {
		clubAccess: async (parent, args, { dataSources,uid, permissions }, info) => {
			return await dataSources.AccessLevelAPI.resolveAccess(parent.clubAccess);
		},
		id: async (parent) => {
			return parent._id;
		},
	},
	UserResult: {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : 'User';
		},
	},
};

module.exports = { queries, mutations, fieldResolvers };
