const events = require('../models/event.js');
const accessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class EventAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    getEvents(args){
        return events.find(args);
    }
    getEventById(id){
        return events.findById(id);
    }
    addEvent(event){
        return events.create(event);
    }
}
module.exports = EventAPI;