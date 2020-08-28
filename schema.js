const {gql}= require('apollo-server');

const User= require('./schema/user');
const Event= require('./schema/event');
const Club= require('./schema/club');
const Venue= require('./schema/venue');

const types=[];
const queries=[];
const mutations=[];

const schemas= [User,Event,Club,Venue];
schemas.forEach((s)=>{
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

union UserOrError = User|Error

type Error {
    code:String
    message:String
    token:String
}
`