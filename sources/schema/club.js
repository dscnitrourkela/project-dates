const types=`
type Club{
    id:ID
    clubName:String
    memberAccess:[AccessLevel]
    facAd:String
    logo:String
    events:[Event]
    society:String
    domain:String
}
`;

const queries=`
    clubs(
        id:ID
        clubName:String
        facAd:String
        logo:String
        society:String
        domain:String
    ):[Club]
    clubByName(name:String):Club
    clubById(id:String):Club
`;

const mutations=`

`;


module.exports = {types,queries,mutations};