/** @format */

const types = `
    type AccessLevel{
        id:ID
        level:String
        name:String
        relation:String
        club:Club
        user:User
    }
    input AccessLevelInputType{
        level: String
        name:String
        relation:String
        club : ID
        user: ID
    }
`;

const queries = `
`;

const mutations = `
`;

module.exports = { types, queries, mutations };
