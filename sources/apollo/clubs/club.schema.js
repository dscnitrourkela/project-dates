/** @format */
// linksMap needs to be finalized
const types = `

union ClubResult= Club | ErrorClass

type Link{
    name: String
    link: String
}

input LinkInput{
    name:String
    link:String
}


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

type Theme{
    name:String
    logo:String
    backgroundColor: String
}

input ThemeInput{
    name:String
    logo:String
    backgroundColor: String
}

type Club{
    id:ID
    clubName:String
    memberAccess:[AccessLevel]
    description: String
    facAd:String
    theme:[Theme]
    events:[Event]
    society:String
    domain:String
    links: [Link]    
    contactInfo:[ContactInfoObj]
}
input ClubInputType{
    clubName:String
    memberAccess:[AccessLevelInputType]
    description: String
    facAd:String
    theme:[ThemeInput]
    events:[ID]
    society:String
    domain:String
    links:  [LinkInput]
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
    clubByName(name:String!):Club
    clubById(id:String!):Club    
`;

const mutations = `
    addClub(club:ClubInputType):ClubResult,
    updateClub(id:ID!,club:ClubInputType):ClubResult,    
    deleteClub(id:ID!):ResponseResult
`;

module.exports = { types, queries, mutations };
