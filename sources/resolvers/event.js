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
}

const fieldResolvers = {
}

module.exports = {queries,mutations,fieldResolvers};