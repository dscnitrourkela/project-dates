/** @format */

const types = `
    scalar Date
    type Story{
        id:ID
        author : Club
        event : Event
        asset : String        
	    assetType: String
        description : String
        createdAt : Date
    }
    type ActiveStory{
        id:ID
        assetType: String
        storyAsset:String
        authorName: String
        authorLogo: String
    }
    type Response{
        success: Boolean
    }
    input StoryInputType{
        author : ID
        event : ID
        asset : String
        assetType: String
        description : String
    }

`;

const queries = `
    currentStories:[ActiveStory]
    storiesByField(
        id:ID
        author : ID
        event : ID
        asset : String
        assetType: String
        description : String
    ):[Story]    
    deleteStory(id:ID):Response    
`;

const mutations = `
    addStory(story:StoryInputType):Story    
`;

module.exports = { types, queries, mutations };
