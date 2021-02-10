

const types = `
    union StoryResult= Story | ErrorClass  
    union CurrentStoryResult = CurrentStory | ErrorClass  

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
    type Logo{
        name: String
        logo: String
    }
    type CurrentStory{
        id:ID
        authorId: String
        authorName: String 
        authorLogo: [Logo]
        story: [Story]
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
    currentStories:[CurrentStoryResult]
    storiesByField(
        id:ID
        author : ID
        event : ID
        asset : String
        assetType: String
        description : String
    ):[Story]    
    deleteStory(
        id:ID!
        author : ID!
    ):ResponseResult
`;

const mutations = `
    addStory(story:StoryInputType):StoryResult  
`;

module.exports = { types, queries, mutations };
