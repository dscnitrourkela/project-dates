/** @format */

const { gql } = require('apollo-server');

const User = require('./schema/user');
const Event = require('./schema/event');
const Club = require('./schema/club');
const Venue = require('./schema/venue');
const Story = require('./schema/story');
const Access = require('./schema/accessLevel');
const ErrorClass = require('./schema/error');
const {GraphQLDateTime} = require('graphql-iso-date');

const types = [];
const queries = [];
const mutations = [];

const schemas = [User, Event, Club, Venue, Access, ErrorClass,Story];
schemas.forEach((s) => {
	types.push(s.types);
	queries.push(s.queries);
	mutations.push(s.mutations);
});

module.exports = gql`
${types.join('\n')}

type Query{
    ${queries.join('\n')}
}

type Mutation {
    ${mutations.join('\n')}
}

union ResponseResult= Response | ErrorClass

type Error {
    code:String
    message:String
    token:String
}

type Response{
    success: Boolean
}
`;
