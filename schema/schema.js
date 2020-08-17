const graphql = require('graphql');
const User=require("../models/user");
const Club=require("../models/club");
const accessLevel=require("../models/accessLevel");

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
                return Club.find({clubName:args.clubName});
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
            // let user = new User({
            //     username: args.input.username,
            //     name: args.input.name,
            //     gmailAuthMail: args.input.gmailAuthMail,
            //     access: [{
            //         accessLevel : args.input.access[0].accessLevel,
            //         associatedClubId : args.input.access[0].associatedClubId
            //     }],
            //     instituteId: args.input.instituteId,
            //     address: args.input.address,
            //     mobile: args.input.mobile,
            //     emergencyContact: args.input.emergencyContact,
            //     displayPicture: args.input.displayPicture,
            // });
            // const result = user.save();
            // //console.log(result);
            // return result;
            const clubId="5f34a1c767861c2674888ff0";
            Club.findById(clubId,(err,foundClub)=>{
                if(err){
                    console.log(err);
                }else{
                    User.create({
                        name:"Harish",
                        username:"harish",
                        gmailAuthMail : "abc@gmail.com",
                        instituteId : "117cs0176",
                        mobile : 9878282989,
                        emergencyContact : 9120901290,
                        displayPicture : "abc.com",
                    },(err,createdUser)=>{
                        userId=createdUser._id;
                        const accessObj={
                            level:"1",
                            associatedClub:foundClub
                        };
                        accessLevel.create(accessObj,(err,createdAccessLevel)=>{
                            createdUser.access.push(createdAccessLevel);                    
                            const retPromise=createdUser.save((err,saved)=>{
                                if(err){
                                    console.log(err);
                                }else{
                                    user.findById(userId).populate("access").exec(function(err,found){
                                        if(err)
                                        console.log(err);
                                        else
                                        console.log(found);
                                    })
                                }
                            })
                            return retPromise;
                        })
                    });
                }
            });
                // User.create({
                //             username: args.input.username,
                //             name: args.input.name,
                //             gmailAuthMail: args.input.gmailAuthMail,
                //             instituteId: args.input.instituteId,
                //             address: args.input.address,
                //             mobile: args.input.mobile,
                //             emergencyContact: args.input.emergencyContact,
                //             displayPicture: args.input.displayPicture,
                //         },
                //         (err,createdUser)=>{
                //             userId=createdUser._id;
                //             const accessObj={
                //                 level:args.input.access[0].accessLevel,
                //                 associatedClub:args.input.access[0].associatedClubId
                //             };
                //             accessLevel.create(accessObj,(err,createdAccessLevel)=>{
                //                 createdUser.access.push(createdAccessLevel);                    
                //                 createdUser.save((err,saved)=>{
                //                     if(err){
                //                         console.log(err);
                //                     }else{
                //                         user.findById(userId).populate("access").exec(function(err,found){
                //                             if(err)
                //                             console.log(err);
                //                             else
                //                             return found;
                //                         })
                //                     }
                //                 })
    
                //             });
                //         });
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