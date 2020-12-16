/** @format */

const types = `
    scalar Date
    type Story{
        id:ID
        author : Club
        event : Event
        asset : String
        description : String
        isExpired : Boolean
        createdAt : Date
    }
    input StoryInputType{
        author : ID
        event : ID
        asset : String
        description : String
    }

`;

const queries = `
    currentStories:[Story]
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
