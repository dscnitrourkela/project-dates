/**
 * Seeding module
 *
 * @format
 * @module Apollo Helper
 */
const { ApolloError} = require('apollo-server');

/**
 * An abstracted function which is reused to resolve the schema type based on the __typename attribute
 * @param {String} name GraphQL typename
 * @returns {String} returns the resolved type name
 */
const resultResolver=(name)=>{
    return {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : name;
		},
	}
}

/**
 * An abstracted functin which checks whether the user has the required permission/authority to perform the requested operation
 * @param {Object} graphqlError graphQL error if any
 * @param {String} requiredPermission the required permission to access the resolver
 * @param {Array} permissions populated list of permissions of the user
 * @throws Will throw a graphQL error if any
 */
const resolverHelper=(graphqlError,requiredPermission,permissions)=>{
	if(graphqlError){
		throw new ApolloError(graphqlError.message,graphqlError.code);
	}else if (permissions.find((permission) => permission === requiredPermission || permission ==="superuser.all")) {
		return true;
	} else {
		return false;
	}
}

module.exports={
	resultResolver,
	resolverHelper
}