/** @format */
// linksMap needs to be finalized
const types = `

union ClubResult= Club | ErrorClass
union ResponseResult= Response | ErrorClass

type ContactInfoObj{
    name: String,
    designation: String
    mobileNo: String
    email: String
}

input ContactInfoObjInput{
    name: String,
    designation: String
    mobileNo: String
    email: String
}

type Club{
    id:ID
    clubName:String
    memberAccess:[AccessLevel]
    description: String
    facAd:String
    logo:String
    events:[Event]
    society:String
    domain:String
    links: String
    backgroundColor: String
    contactInfo:[ContactInfoObj]
}
input ClubInputType{
    clubName:String
    memberAccess:[AccessLevelInputType]
    description: String
    facAd:String
    logo:String
    events:[ID]
    society:String
    domain:String
    links:  String
    backgroundColor: String
    contactInfo:[ContactInfoObjInput]
}
`;

const queries = `
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
    deleteClub(id:ID!):ResponseResult
`;

const mutations = `
    addClub(club:ClubInputType):ClubResult,
    updateClub(id:ID!,club:ClubInputType):ClubResult,    
`;

module.exports = { types, queries, mutations };
