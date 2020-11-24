const types = `
    type AccessLevel{
        id:ID
        level:String
        club:Club
        user:User
    }
    input AccessLevelInputType{
        level: String
        club : ID
        user: ID
    }
`;

const queries = `
`;

const mutations = `
`;

module.exports = { types, queries, mutations };
