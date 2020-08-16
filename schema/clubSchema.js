const graphql = require('graphql');
const User=require("../models/user");
const Club=require("../models/club");
const userSchema=require("./userSchema");

const{
    UserType,
    createUserInputType,
    AccessDetailsType,
    AccessDetailsInputType,
}=userSchema

const{
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema
}= graphql;

const Type =`const ClubType = new GraphQLObjectType({
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
});`

const Query = `
        club:{
            type:new GraphQLList(ClubType),
            args:{
                clubName:{type:GraphQLString}
            },
            resolve(parent,args){
                return Club.find({clubName:args.ClubName});
            }
        },
        clubs:{
            type:new GraphQLList(ClubType),
            resolve(parent,args){
                return Club.find({});
            }
        },`

const Mutation =
        `addClub : {
            type: ClubType,
            args: {
                input: { type: createClubInputType },
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
            return club.insert();
            },

        }`




module.exports= {
    Types:'${Type}', 
    Mutation:'$(Mutation.fields)',
    RootQuery:'$(RootQuery.fields)'
}