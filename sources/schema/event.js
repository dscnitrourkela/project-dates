/** @format */

const types = `
    type Event{
        id:ID
        organizer : Club
        eventName : String
        startDateTime : String
        venue : Venue
        endDateTime : String
        registrationPrice : Int
        registrationCount : Int
        otherDescription : String
        attendees : [User]
        announcements : String
        link : String
        picture : String
    }
    input EventInputType{
        organizer : ID
        eventName : String
        startDateTime : String
        venue : ID
        endDateTime : String
        registrationPrice : Int
        registrationCount : Int
        otherDescription : String
        attendees : [ID]
        announcements : String
        link : String
        picture : String
    }

`;

const queries = `
    events(
        id:ID
        eventName:String
        facAd:String
        logo:String
        society:String
        domain:String
    ):[Event]
    eventByName(name:String):Event
    eventById(id:String):Event

`;

const mutations = `
    addEvent(event:EventInputType):Event
    updateEvent(id:ID,event:EventInputType):Event
    deleteEvent(id:ID):Event
`;

module.exports = { types, queries, mutations };
