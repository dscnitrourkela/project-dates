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

`;

const mutations=`

`;

module.exports = {types,queries,mutations};