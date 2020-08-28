const types=`
    type User{
        id:ID
        name:String
        username:String
        gmailAuthMail:String
        access:[AccessLevel]
        instituteId:String
        mobile:String
        emergencyContact:String
        displayPicture:String
    }
    type AccessLevel{
        id:ID
        level:String
        Clubs:[Club]
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
        club : [String]
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
    userById(username:String):User
`;

const mutations=`
    addUser(user:UserInputType):User
`;

module.exports = {types,queries,mutations};