/** @format */

const ERRORS = require('../errors');

const queries = {
	users: (parent, args, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'users.all')) {
			return dataSources.UserAPI.getUsers(args);
		} else {
			return [ERRORS.PERMISSION_DENIED];
		}
	},
	/**
	 * Resolver for User by Username.
	 * @param {string} username - username query
	 * @reutrns {Object} User - User with the queries username
	 */
	userByUsername: async (parent, { username }, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'users.byName')) {
			return dataSources.UserAPI.getUserByUsername(username);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}
	},
	userById: async (parent, { id }, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'users.byId')) {
			return dataSources.UserAPI.getUserById(id);
		} else {
			return ERRORS.PERMISSION_DENIED;
		}
	},
};

const mutations = {
	addUser: (parent, { user }, { dataSources ,uid }, info) => {
		return dataSources.UserAPI.addUser(user,uid);
	},
	updateUser: (parent, args, { dataSources }, info) => {
		return dataSources.UserAPI.updateUser(args);
	},
	deleteUser: (parent, { id }, { dataSources }, info) => {
		return dataSources.UserAPI.deleteUser(id);
	},
};
const fieldResolvers = {
	User: {
		clubAccess: async (parent, args, { dataSources }, info) => {
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
