const Query= require("./resolvers/query");
const accessLevel=require('./models/accessLevel');
const user=require('./models/user');
const club=require('./models/club');
// const Session= require("./resolvers/session");
const Mutation= require("./resolvers/mutation");

module.exports = {
    Query,    
    Mutation,
    Club:{        
        clubMembers:async (parent,args)=>{
            return await accessLevel.find({
                '_id': { $in: parent.clubMembers}
            });
        }
    },
    User:{        
        clubs:async (parent,args)=>{
            return await accessLevel.find({
                '_id': { $in: parent.clubs}
            });
        }
    },
    AccessLevel:{
        user:async (parent,args)=>{
            console.log(parent);
            return await user.findById(parent.associatedUser);
        },
        club:async (parent,args)=>{
            return await club.findById(parent.associatedClub);
        }
    },
    // User:{
    //     access:
    // },
    UserOrError:{
        __resolveType(obj){
            if(obj.code){
                return 'Error';
            }else{
                return 'User';
            }
        }
    }
};