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
input ClubInputType{
    clubName:String
    memberAccess:[AccessLevelInputType]
    facAd:String
    logo:String
    events:[ID]
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
    addClub(club:ClubInputType):Club,
`;


module.exports = {types,queries,mutations};