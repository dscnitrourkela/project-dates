const types=`
    type User{
        id:ID
        name:String
        username:String
        gmailAuthMail:String
        clubs:[AccessLevel]
        instituteId:String
        mobile:String
        emergencyContact:String
        displayPicture:String
    }
    type AccessLevel{
        id:ID
        level:String
        club:Club
        user:User
    }
    input UserInputType{
        name:String
        username:String
        gmailAuthMail:String
        access:[AccessLevelInputType]
        instituteId:String
        mobile:String
        emergencyContact:String
        displayPicture:String
    }
    input AccessLevelInputType{
        level: String
        club : String
        user: String
    }
    
`;

const queries=`
    allUsers:[User]
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
`;

module.exports = {types,queries,mutations};