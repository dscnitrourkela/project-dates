const Events = require('../models/event.js');
const Users = require('../models/user.js');
const Clubs = require('../models/club.js');
const Venues = require('../models/venue.js');
const AccessLevel = require('../models/accessLevel.js');
const {DataSource} = require('apollo-datasource');

class EventAPI extends DataSource{
    constructor(){
        super();
    }
    initialize(config){

    }
    getEvents(args){
        return Events.find(args);
    }
    getEventById(id){
        return Events.findById(id);
    }
    async resolveEventAttendees(userArray){
        return await Users.find({
            '_id': { $in: userArray}
        });
    }
    async addEvent(event){
        let retPromise={};
        // Create Event with basic types;
        let createdEvent=await Events.create({
            eventName : event.eventName,
            startDateTime : event.startDateTime,
            endDateTime : event.endDateTime,
            registrationPrice : event.registrationPrice,
            registrationCount : event.registrationCount,
            otherDescription : event.otherDescription,
            announcements : event.announcements,
            link : event.link,
            picture : event.picture,                     
        });

        //Add nested types
        //1.Attendees
        const eventId = createdEvent._id;
        const attendeesArray = event.attendees;
        await Promise.all(attendeesArray.map(async (attendee,index)=>{
            const userId=attendee;
            const foundUser=await Users.findById(userId);
            createdEvent.attendees.push(foundUser._id);
        }))             
        //2. organizer
        const organizerId = event.organizer;
        
        const foundOrganizer = await Clubs.findById(organizerId);
        createdEvent.organizer=foundOrganizer._id;
        foundOrganizer.events.push(eventId);
        await foundOrganizer.save();

        //3. Venue
        const venueId= event.venue;
        const foundVenue = await Venues.findById(venueId);
        createdEvent.venue=foundVenue._id;

        retPromise=await createdEvent.save();           
        return retPromise;
    }
}
module.exports = EventAPI;