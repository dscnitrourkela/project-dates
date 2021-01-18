/** @format */

const { Error } = require('mongoose');
const ERRORS = require('../errors');
const {resolverHelper} = require("../helpers/apollo");

const queries = {
	users: (parent, args, { dataSources,permissions,error }, info) => {
		return resolverHelper(error,'users.all',permissions) 
			?  dataSources.UserAPI.getUsers(args)
			: [ERRORS.PERMISSION_DENIED]		
	},
	/**
	 * Resolver for User by Username.
	 * @param {string} username - username query
	 * @reutrns {Object} User - User with the queries username
	 */
	userByUsername: async (parent, { username }, { dataSources,uid, permissions,error }, info) => {
		return resolverHelper(error,'users.byName',permissions) 
			?  dataSources.UserAPI.getUserByUsername(username)
			: ERRORS.PERMISSION_DENIED				
	},
	userById: async (parent, { id }, {dataSources,uid, permissions, error }, info) => {
		return resolverHelper(error,'users.byId',permissions) 
			?  dataSources.UserAPI.getUserById(id)
			: ERRORS.PERMISSION_DENIED				
	},
};

const mutations = {
	authUser: (parent, { user }, { dataSources,uid, permissions, error}, info) => {
		return resolverHelper(error,'users.Auth',permissions) 
			?  dataSources.UserAPI.authUser(user,uid)
			: ERRORS.PERMISSION_DENIED				
	},
	updateUser: (parent, args, { dataSources,uid, permissions, error}, info) => {
		return resolverHelper(error,'users.Update',permissions) 
			?  dataSources.UserAPI.updateUser(args,uid)
			: ERRORS.PERMISSION_DENIED					
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
