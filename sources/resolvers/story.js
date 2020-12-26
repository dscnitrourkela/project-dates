/** @format */

const ERRORS = require('../errors');
const permissions= require("../models/permission");

const queries = {
	storiesByField: (parent, args, { dataSources }, info) => {
		return dataSources.StoryAPI.getStories(args);
    },
    currentStories: (parent, args, { dataSources }, info) => {
		return dataSources.StoryAPI.getCurrentStories();
	},
	deleteStory: async (parent, args , { dataSources ,uid,permissions}, info) => {
		if (permissions.find((permission) => permission == 'stories.delete')) {				
			return dataSources.StoryAPI.deleteStory(args);
		} else {
			return [ERRORS.PERMISSION_DENIED];
		}		
	}
};

const mutations = {
	addStory: async (parent, { story }, { dataSources ,uid,permissions}, info) => {
		if (permissions.find((permission) => permission == 'stories.add')) {			
			return dataSources.StoryAPI.addStory(story);
		} else {
			return [ERRORS.PERMISSION_DENIED];
		}		
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
