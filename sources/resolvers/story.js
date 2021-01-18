/** @format */

const ERRORS = require('../errors');
const permissions= require("../models/permission");
const {resolverHelper} = require("../helpers/apollo");

const queries = {
	storiesByField: (parent, args, { dataSources }, info) => {
		return dataSources.StoryAPI.getStories(args);
    },
    currentStories: (parent, args, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'stories.view',permissions) 
			?  dataSources.StoryAPI.getCurrentStories()
			: ERRORS.PERMISSION_DENIED							
	},
	deleteStory: async (parent, args , { dataSources ,uid,permissions,error}, info) => {
		return resolverHelper(error, 'stories.delete$'+args.author,permissions) 
			?  dataSources.StoryAPI.deleteStory(args)
			: ERRORS.PERMISSION_DENIED											
	}
};

const mutations = {
	addStory: async (parent, { story }, { dataSources ,uid,permissions,error}, info) => {
		return resolverHelper(error, 'stories.add$'+story.author,permissions) 
			?  dataSources.StoryAPI.addStory(story)
			: ERRORS.PERMISSION_DENIED						
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
			return await dataSources.StoryAPI.getStoryByIds(parent.story);
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
