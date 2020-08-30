const types=`
    type Venue{
        id:ID
        name:String
        description:String
    }
`;

const queries=`
    venues(
        id:ID
        venueName:String
        facAd:String
        logo:String
        society:String
        domain:String
    ):[Venue]
    venueByName(name:String):Venue
    venueById(id:String):Venue

`;

const mutations=`

`;


module.exports = {types,queries,mutations};