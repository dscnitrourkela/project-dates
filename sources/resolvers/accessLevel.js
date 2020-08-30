const queries={
}

const mutations={
}

const fieldResolvers = {
    AccessLevel:{        
        user:async (parent,args,{dataSources},info)=>{
            return await dataSources.UserAPI.getUserById(parent.user);
        },
        club:async (parent,args,{dataSources},info)=>{
            return await dataSources.ClubAPI.getClubById(parent.club);
        }
    },
}

module.exports = {queries,mutations,fieldResolvers};