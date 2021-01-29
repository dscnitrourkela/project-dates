/** @format */

const PERMISSION_DENIED = {
	__typename: 'ErrorClass',
	message: `Permission Denied.`,
	code: `ERROR101`,
};

const INVALID_INPUT = {
	__typename: 'ErrorClass',	
	code: `ERROR102`,
}

module.exports = {
	PERMISSION_DENIED,
	INVALID_INPUT
};
