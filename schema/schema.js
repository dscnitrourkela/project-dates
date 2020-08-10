const graphql = require('graphql');
const User=require("../models/user");
const Club=require("../models/club");

const{
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        name : {type: GraphQLString},
        username : {type: GraphQLString},
        gmailAuthMail : {type: GraphQLString},
        // firebaseToken : {type: GraphQLString},
        access : {
            type : new GraphQLList(AccessDetailsType)
        },
        instituteId : {type: GraphQLString},
        address : {type : GraphQLString},
        mobile : {type: GraphQLInt},
        emergencyContact : {type: GraphQLInt},
        displayPicture : {type: GraphQLString}
    })
});

const AccessDetailsType = new GraphQLObjectType({
    name: 'accessDetails',
    input: {
        accessLevel: {type:GraphQLString},
        associatedClubId: {type:GraphQLString},
    },
    fields:()=>({
        accessLevel : {type:GraphQLString},
        associatedClubId : {
            type : new GraphQLList(ClubType),
            resolve(parent,args){
                return User.find({
                    access:{
                        associatedClubId:parent._id
                    }
                })
            }
        }
    })
});
const ClubType = new GraphQLObjectType({
    name: 'Club',
    fields: () => ({
        clubName : {type: GraphQLString},
        clubMember : {
            type : new GraphQLList(UserType),
            resolve(parent,args){
                return User.find({
                    access:{
                        associatedClubId:parent._id
                    }
                })
            }
        },
        facAd : {type: GraphQLString},
        logo : {type: GraphQLString},
        events : {
            type : new GraphQLList(GraphQLString)
        },
        society : {type: GraphQLString},
        domain : {type: GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        user:{
            type:new GraphQLList(UserType),
            args:{
                username:{type:GraphQLString}
            },
            resolve(parent,args){
                console.log(args.username);
                return User.find({username:args.username});
            }
        },
        club:{
            type:new GraphQLList(ClubType),
            args:{
                clubName:{type:GraphQLString}
            },
            resolve(parent,args){
                return Club.find({clubName:args.ClubName});
            }
        },
        users:{
            type:new GraphQLList(UserType),
            resolve(parent,args){
                return User.find({});
            }
        },
        clubs:{
            type:new GraphQLList(ClubType),
            resolve(parent,args){
                return Club.find({});
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name:'Mutations',
    fields:{
        addUser:{
            type:UserType,
            input:{
                accessLevel: {type: GraphQLString},
                associatedClubId:{type: GraphQLString}
            },
            args:{
                name : {type: GraphQLString},
                username : {type: GraphQLString},
                gmailAuthMail : {type: GraphQLString},
                // firebaseToken : {type: GraphQLString},
                access : {
                    type : new GraphQLList(AccessDetailsType)
                },
                instituteId : {type: GraphQLString},
                address : {type : GraphQLString},
                mobile : {type: GraphQLInt},
                emergencyContact : {type: GraphQLInt},
                displayPicture : {type: GraphQLString},
            },
            resolve(parent,args){
                let user = new User({
                    username:args.username,
                    name:args.name,
                    gmailAuthMail:args.gmailAuthMail,
                    access:args.access,
                    instituteId:args.instituteId,
                    address:args.address,
                    mobile:args.mobile,
                    emergencyContact:args.emergencyContact,
                    displayPicture:args.displayPicture,
                });
                return user.save();
            }
        }
    }
})





module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});