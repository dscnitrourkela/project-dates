

const types = `

    union UserResult= User | ErrorClass

    type User{
        id:ID
        name:String
        username:String
        gmailAuthMail:String
        clubAccess:[AccessLevel]
        instituteId:String
        mobile:String
        emergencyContact:String
        displayPicture:String
        address:String
    }
    input UserInputType{
        name:String
        username:String
        gmailAuthMail:String
        instituteId:String
        mobile:String
        emergencyContact:String
        displayPicture:String
        address:String
    }
    
`;

const queries = `
    users(
        name:String
        username:String
        gmailAuthMail:String
        instituteId:String
        mobile:String
        emergencyContact:String
    ):[UserResult]
    userByUsername(username:String):UserResult
    userById(id:String):UserResult
`;

const mutations = `
    authUser(user:UserInputType):UserResult
    updateUser(user:UserInputType):UserResult
    deleteUser:ResponseResult
`;

module.exports = { types, queries, mutations };
