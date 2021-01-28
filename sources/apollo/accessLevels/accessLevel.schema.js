/** @format */

const types = `
    union AccessLevelResponse= AccessLevel | ErrorClass
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
    addAccessLevel(accessLevel:AccessLevelInputType):AccessLevelResponse,
    updateAccessLevel(id:ID,accessLevel:AccessLevelInputType):AccessLevelResponse,
    deleteAccessLevel(id:ID):AccessLevelResponse,
`;

module.exports = { types, queries, mutations };
