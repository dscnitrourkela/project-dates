const { ApolloError} = require('apollo-server');

const resultResolver=(name)=>{
    return {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : name;
		},
	}
}

const resolverHelper=(graphqlError,requiredPermission,permissions)=>{
	if(graphqlError){
		throw new ApolloError(graphqlError.message,graphqlError.code);
	}else if (permissions.find((permission) => permission == requiredPermission || permission =="superuser.all")) {
		return true;
	} else {
		return false;
	}
}

module.exports={
	resultResolver,
	resolverHelper
}