const graphql = require('graphql');
const User=require("../models/user");
const Club=require("../models/club");
const clubSchema=require("./clubSchema");

const{
    ClubType,
    createClubInputType
}=clubSchema;


const{
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;

const Type =`

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLID},
        name : {type: GraphQLString},
        username : {type: GraphQLString},
        gmailAuthMail : {type: GraphQLString},
        // firebaseToken : {type: GraphQLString},
        access : {
            type : new GraphQLList(AccessDetailsType),
            resolve(parent, args) {
                return Club.find({
                    _id: { $in:parent.associatedClubId}
                });
            }
        },
        instituteId : {type: GraphQLString},
        address : {type : GraphQLString},
        mobile : {type: GraphQLInt},
        emergencyContact : {type: GraphQLInt},
        displayPicture : {type: GraphQLString}
    })
});
 
const AccessDetailsType = new GraphQLObjectType({
    name: "accessDetails",
    fields: () => ({
      accessLevel: { type: GraphQLString },
      associatedClubId: {
          type: ClubType,
          resolve(parent, args) {
            console.log(parent._id);
            return Club.findById(associatedClubId);
          } 
        },
    })
}); 

const AccessDetailsInputType = new GraphQLInputObjectType({
    name: "accessDetailsInput",
    input: {
        accessLevel: { type: GraphQLString },
      associatedClubId: { type: GraphQLString },
    },
    fields: () => ({
        accessLevel: { type: GraphQLString },
      associatedClubId: {type: GraphQLString},
    }),
  });

const createUserInputType = new GraphQLInputObjectType({
    name: "CreateUserInput",
    description: "Input for adding user",
    fields: () => ({
      name: { type: GraphQLString },
      username: { type: GraphQLString },
      gmailAuthMail: { type: GraphQLString },
      // firebaseToken : {type: GraphQLString},
      access: {
        type: new GraphQLList(AccessDetailsInputType),
      },
      instituteId: { type: GraphQLString },
      address: { type: GraphQLString },
      mobile: { type: GraphQLInt },
      emergencyContact: { type: GraphQLInt },
      displayPicture: { type: GraphQLString },
    }),
});`


const RootQuery = 
        `user:{
            type:new GraphQLList(UserType),
            args:{
                username:{type:GraphQLString}
            },
            resolve(parent,args){
                return User.find({username:args.username});
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return User.find({});
            }
        }`

const Mutation =
        `addUser: {
            type: UserType,
            args: {
                input: { type: createUserInputType },
            },
            resolve(parent, args) {
                console.log(typeof(args.input.access[0].accessLevel));
                let user = new User({
                    username: args.input.username,
                    name: args.input.name,
                    gmailAuthMail: args.input.gmailAuthMail,
                    access: {
                        accessLevel : args.input.access[0].accessLevel,
                        associatedClubId : args.input.access[0].associatedClubId
                    },
                    instituteId: args.input.instituteId,
                    address: args.input.address,
                    mobile: args.input.mobile,
                    emergencyContact: args.input.emergencyContact,
                    displayPicture: args.input.displayPicture,
                });
                return user.save();                    
            }
        },`
    
module.exports= {
    Type:'${Type}', 
    Mutation:'${Mutation}',
    RootQuery:'${RootQuery}'
}