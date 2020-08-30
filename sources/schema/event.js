const types=`
    type Event{
        id:ID
        organizer : User
        eventName : String
        startDateTime : String
        venueId : Venue
        endDateTime : String
        registrationPrice : Int
        registrationCount : Int
        otherDescription : String
        attendees : [User]
        announcements : String
        link : String
        picture : String
    }

`;

const queries=`
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

const mutations=`

`;

module.exports = {types,queries,mutations};