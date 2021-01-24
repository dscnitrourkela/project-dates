/** @format */

const { Error } = require('mongoose');
const ERRORS = require('../errors');
const {resolverHelper} = require("../helpers/apollo");

const queries = {
	/**
	 * Resolver to get all users.
	 * @param {Object} args - arguments to query
	 * @reutrns [{Object}] users - list of users
	 */
	users: (parent, args, { dataSources,permissions,error }, info) => {
		return resolverHelper(error,'users.all',permissions) 
			?  dataSources.UserAPI.getUsers(args)
			: [ERRORS.PERMISSION_DENIED]		
	},
	/**
	 * Resolver for User by Username.
	 * @param {string} username - username query
	 * @reutrns {Object} User - User with the queried username
	 */
	userByUsername: async (parent, { username }, { dataSources,uid, permissions,error }, info) => {
		return resolverHelper(error,'users.byName',permissions) 
			?  dataSources.UserAPI.getUserByUsername(username)
			: ERRORS.PERMISSION_DENIED				
	},
	/**
	 * Resolver for User by Username.
	 * @param {string} id - User ID
	 * @reutrns {Object} User - User with the queried id
	 */
	userById: async (parent, { id }, {dataSources,uid, permissions, error }, info) => {
		return resolverHelper(error,'users.byId',permissions) 
			?  dataSources.UserAPI.getUserById(id)
			: ERRORS.PERMISSION_DENIED				
	},
};

const mutations = {
	/**
	 * Resolver to authenticate user
	 * This mutation is used for both signing up and signing in the user. 
	 * The logic to detect and handle the auth state is taken care of the underlying datasources function.	 * 
	 * @param {Object} user - User Object 
	 * @param {String} uid - Firebase UID
	 * @reutrns {Object} User - Authenticated user
	 */
	authUser: (parent, { user }, { dataSources,uid, permissions, error}, info) => {
		return resolverHelper(error,'users.Auth',permissions) 
			?  dataSources.UserAPI.authUser(user,uid)
			: ERRORS.PERMISSION_DENIED				
	},
	/**
	 * Resolver to update user info
	 * This mutation is used to update the new values sent from the client
	 * It is also used to set Institute Email as a part of NITR Verification Process.
	 * The datasources handles the logic to detech this request and processes it accordingly
	 * @param {Object} args - updated info of the user
	 * @param {String} uid - Firebase UID
	 * @reutrns {Object} User -Updated user
	 */
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