/** @format */

const types = `
    scalar Date
    type Story{
        id:ID
        author : Club
        event : Event
        asset : String
        description : String
        createdAt : Date
    }
    type ActiveStory{
        storyAsset:String
        authorName: String
        authorLogo: String
    }
    input StoryInputType{
        author : ID
        event : ID
        asset : String
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
        description : String
    ):[Story]
    
`;

const mutations = `
    addStory(story:StoryInputType):Story
`;

module.exports = { types, queries, mutations };
