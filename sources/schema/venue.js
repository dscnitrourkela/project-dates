const types=`
    type Venue{
        id:ID
        name:String
        description:String
    }
    input VenueInputType{
        name:String
        description:String
    }
`;

const queries=`
    venues(
        venue:VenueInputType
    ):[Venue]
    venueByName(name:String):Venue
    venueById(id:String):Venue

`;

const mutations=`
    addVenue(venue:VenueInputType):Venue
    updateVenue(id:ID,venue:VenueInputType):Venue
    deleteVenue(id:ID):Venue
`;


module.exports = {types,queries,mutations};