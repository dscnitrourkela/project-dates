/** @format */

const ERRORS = require('../errors');
const permissions= require("../models/permission");

const queries = {
	storiesByField: (parent, args, { dataSources }, info) => {
		return dataSources.StoryAPI.getStories(args);
    },
    currentStories: (parent, args, { dataSources, permissions }, info) => {
		if (permissions.find((permission) => permission == 'stories.view')) {				
			return dataSources.StoryAPI.getCurrentStories();
		} else {
			return ERRORS.PERMISSION_DENIED;
		}			
	},
	deleteStory: async (parent, args , { dataSources ,uid,permissions}, info) => {
		if (permissions.find((permission) => permission == 'stories.delete$'+args.author)) {			
			return dataSources.StoryAPI.deleteStory(args); //need to add authorization check
		} else {
			return ERRORS.PERMISSION_DENIED;
		}		
	}
};

const mutations = {
	addStory: async (parent, { story }, { dataSources ,uid,permissions}, info) => {
		if (permissions.find((permission) => permission == 'stories.add$'+story.author)) {			
			return dataSources.StoryAPI.addStory(story);
		} else {
			return ERRORS.PERMISSION_DENIED;
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
	CurrentStory: {
		story: async (parent, args, { dataSources }, info) => {
			return await dataSources.StoryAPI.getStoryById(parent.story);
        }
	},
	StoryResult: {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : 'Story';
		},
	},
	ResponseResult: {
		__resolveType: (obj) => {
			return obj.__typename == 'ErrorClass' ? 'ErrorClass' : 'Response';
		},
	},
};

module.exports = { queries, mutations, fieldResolvers };
