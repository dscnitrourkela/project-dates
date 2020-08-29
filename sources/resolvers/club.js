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

module.exports = {queries,mutations};