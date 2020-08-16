const graphql = require('graphql');
const User=require("../models/user");
const Club=require("../models/club");

const{
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;



//#####################################  Start UserType  ##########################################

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
  });

//##################################### End UserType  #############################################

//##################################### Start ClubType  ##########################################
  
  const ClubType = new GraphQLObjectType({
    name: 'Club',
    fields: () => ({
        id: {type: GraphQLID},
        clubName : {type: GraphQLString},
        clubMember : {
            type : UserType,
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
        // events : {
        //     type : new GraphQLList(EventType),
        //     resolve(parent,args){
        //         return Event.find({Organizer_id:parent._id})
        //     }
        // },
        society : {type: GraphQLString},
        domain : {type: GraphQLString},
    })
});

const createClubInputType = new GraphQLInputObjectType({
    name: "CreateClubInput",
    description: "Input for adding Club",
    fields: () => ({
        clubName: { type: GraphQLString },
        clubMember: { type: new GraphQLList( GraphQLString) },
        facAd: { type: GraphQLString },
        logo: { type: GraphQLString },
        // events: { type: new GraphQLList(GraphQLString) },
        society: { type: GraphQLString },
        domain: {type: GraphQLString}
    }),
});

//##################################### End ClubType  #######################################


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields: {
        user:{
            type:new GraphQLList(UserType),
            args:{
                username:{type:GraphQLString}
            },
            resolve(parent,args){
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
    name: "Mutations",
    fields: {
      
        addUser: {
            type: UserType,
            //   input: AccessDetailsType,
            args: {
            input: { type: createUserInputType },
            // name: { type: GraphQLString },
            // username: { type: GraphQLString },
            // gmailAuthMail: { type: GraphQLString },
            // // firebaseToken : {type: GraphQLString},
            // access: {
            //   type: AccessDetailsType,
            // },
            // instituteId: { type: GraphQLString },
            // address: { type: GraphQLString },
            // mobile: { type: GraphQLInt },
            // emergencyContact: { type: GraphQLInt },
            // displayPicture: { type: GraphQLString },
            },
            resolve(parent, args) {
                //console.log(args.input.access[0]);
            let user = new User({
                username: args.input.username,
                name: args.input.name,
                gmailAuthMail: args.input.gmailAuthMail,
                access: [{
                    accessLevel : args.input.access[0].accessLevel,
                    associatedClubId : args.input.access[0].associatedClubId
                }],
                instituteId: args.input.instituteId,
                address: args.input.address,
                mobile: args.input.mobile,
                emergencyContact: args.input.emergencyContact,
                displayPicture: args.input.displayPicture,
            });
            return user.save((err,cust)=>{
                if(err)
                    console.log(err);
                else    
                    console.log("cust");
            })
            }
        },
        addClub : {
            type: ClubType,
            args: {
                input: { type: createClubInputType },
            // name: { type: GraphQLString },
            // username: { type: GraphQLString },
            // gmailAuthMail: { type: GraphQLString },
            // // firebaseToken : {type: GraphQLString},
            // access: {
            //   type: AccessDetailsType,
            // },
            // instituteId: { type: GraphQLString },
            // address: { type: GraphQLString },
            // mobile: { type: GraphQLInt },
            // emergencyContact: { type: GraphQLInt },
            // displayPicture: { type: GraphQLString },
            },
            resolve(parent, args) {
            let club = new Club({
                clubName: args.input.clubName,
                clubMember: args.input.clubMember,
                facAd: args.input.facAd,
                logo: args.input.logo,
                // events: { type: new GraphQLList(GraphQLString) },
                society: args.input.society,
                domain: args.input.domain,
            });
            return club.save();
            },

        }
    },
  });



// const Mutation = new GraphQLObjectType({
//     name:'Mutations',
//     fields:{
//         addUser:{
//             type:UserType,
//             args:{
//                 name : {type: GraphQLString},
//                 username : {type: GraphQLString},
//                 gmailAuthMail : {type: GraphQLString},
//                 // firebaseToken : {type: GraphQLString},
//                 input : {type : new AccessDetailsInputType},
//                 instituteId : {type: GraphQLString},
//                 address : {type : GraphQLString},
//                 mobile : {type: GraphQLInt},
//                 emergencyContact : {type: GraphQLInt},
//                 displayPicture : {type: GraphQLString},
//             },
//             resolve(parent,args){
//                 let user = new User({
//                     username:args.username,
//                     name:args.name,
//                     gmailAuthMail:args.gmailAuthMail,
//                     access:args.input,
//                     instituteId:args.instituteId,
//                     address:args.address,
//                     mobile:args.mobile,
//                     emergencyContact:args.emergencyContact,
//                     displayPicture:args.displayPicture,
//                 });
//                 return user.save();
//             }
//         }
//     }
// })





module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
});