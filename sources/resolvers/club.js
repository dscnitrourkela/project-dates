const queries={
    clubs:(parent,args,{dataSources},info) => {
        return dataSources.ClubAPI.getClubs(args);
    },
    clubByName:(parent,{name},{dataSources},info) =>{
        return dataSources.ClubAPI.getClubByName(name);
    },
    clubById:(parent,{id},{dataSources},info) =>{
        return dataSources.ClubAPI.getClubById(id);
    }
}

const mutations={
}

const fieldResolvers = {
    Club:{        
        memberAccess:async (parent,args,{dataSources},info)=>{
            return await dataSources.AccessLevelAPI.resolveAccess(parent.memberAccess);
        }
    },
}

module.exports = {queries,mutations,fieldResolvers};