const queries={
    events:(parent,args,{dataSources},info) => {
        return dataSources.EventAPI.getEvents(args);
    },
    eventByName:(parent,{name},{dataSources},info) =>{
        return dataSources.EventAPI.getEventByName(name);
    },
    eventById:(parent,{id},{dataSources},info) =>{
        return dataSources.EventAPI.getEventById(id);
    }
}

const mutations={
    addEvent:(parent,{event},{dataSources},info) =>{
        return dataSources.EventAPI.addEvent(event);
    },
    updateEvent:(parent,args,{dataSources},info) =>{
        return dataSources.EventAPI.updateEvent(args);
    }
}

const fieldResolvers = {
    Event:{
        organizer:async (parent,args,{dataSources},info)=>{
            return await dataSources.ClubAPI.getClubById(parent.organizer);
        },
        venue:async (parent,args,{dataSources},info)=>{
            return await dataSources.VenueAPI.getVenueById(parent.venue);
        },
        attendees:async (parent,args,{dataSources},info)=>{
            return await dataSources.EventAPI.resolveEventAttendees(parent.attendees);
        }
    }
}

module.exports = {queries,mutations,fieldResolvers};