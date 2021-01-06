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
    addAccessLevel(accessLevel:AccessLevelInputType):AccessLevel,
    updateAccessLevel(id:ID,accessLevel:AccessLevelInputType):AccessLevel,
    deleteAccessLevel(id:ID):AccessLevel,
`;

module.exports = { types, queries, mutations };
