const { gql } = require('apollo-server');

const User = require('./users/user.schema.js');
const Event = require('./events/event.schema.js');
const Club = require('./clubs/club.schema.js');
const Venue = require('./venues/venue.schema.js');
const Story = require('./stories/story.schema.js');
const Access = require('./accessLevels/accessLevel.schema.js');
const ErrorClass = require('./errorClass/error.schema.js');
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
