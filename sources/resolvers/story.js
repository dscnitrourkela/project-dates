/** @format */

const queries = {
	storiesByField: (parent, args, { dataSources }, info) => {
		return dataSources.StoryAPI.getStories(args);
    },
    currentStories: (parent, args, { dataSources }, info) => {
		return dataSources.StoryAPI.getCurrentStories();
	}
};

const mutations = {
	addStory: (parent, { story }, { dataSources }, info) => {
		return dataSources.StoryAPI.addStory(story);
	}
};

const fieldResolvers = {
	Story: {
		author: async (parent, args, { dataSources }, info) => {
			return await dataSources.ClubAPI.getClubById(parent.author);
        },
        event: async (parent, args, { dataSources }, info) => {
			return await dataSources.EventAPI.getEventById(parent.event);
		},
	},
};

module.exports = { queries, mutations, fieldResolvers };
