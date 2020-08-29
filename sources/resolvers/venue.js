const queries={
    venues:(parent,args,{dataSources},info) => {
        return dataSources.ClubAPI.getVenues(args);
    },
    venueByName:(parent,{name},{dataSources},info) =>{
        return dataSources.VenueAPI.getVenueByName(name);
    },
    venueById:(parent,{id},{dataSources},info) =>{
        return dataSources.VenueAPI.getVenueById(id);
    }
}

const mutations={
}

module.exports = {queries,mutations};