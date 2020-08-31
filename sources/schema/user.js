const types=`
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
    }
    input UserInputType{
        name:String
        username:String
        gmailAuthMail:String
        clubAccess:[AccessLevelInputType]
        instituteId:String
        mobile:String
        emergencyContact:String
        displayPicture:String
    }
    
`;

const queries=`
    users(
        id:ID
        name:String
        username:String
        gmailAuthMail:String
        instituteId:String
        mobile:String
        emergencyContact:String
    ):[User]
    userByUsername(username:String):User
    userById(id:String):User
`;

const mutations=`
    addUser(user:UserInputType):User
    updateUser(id:ID,user:UserInputType):User
`;

module.exports = {types,queries,mutations};