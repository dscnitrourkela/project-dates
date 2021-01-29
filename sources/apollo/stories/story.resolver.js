/** @format */

const ERRORS = require('../../errors');
const permissions= require("../permissions/permission.model.js");
const {resultResolver,resolverHelper} = require("../../helpers/apollo");

const queries = {
	// storiesByField: (parent, args, { dataSources }, info) => {
	// 	return dataSources.StoryAPI.getStories(args);
    // },
    currentStories: (parent, args, { dataSources, permissions, error }, info) => {
		return resolverHelper(error,'stories.view',permissions) 
			?  dataSources.StoryAPI.getCurrentStories()
			: [ERRORS.PERMISSION_DENIED]
	},
	deleteStory: async (parent, args , { dataSources ,uid,permissions,error}, info) => {
		return resolverHelper(error, 'stories.delete$'+args.author,permissions) 
			?  dataSources.StoryAPI.deleteStory(args)
			: ERRORS.PERMISSION_DENIED											
	}
};

const mutations = {
	addStory: async (parent, { story }, { dataSources ,uid,permissions,error}, info) => {
		if(story==undefined || story.author==undefined){
            return {...ERRORS.INVALID_INPUT, message:"Input Story must have author"}
        }else{
			return resolverHelper(error, 'stories.add$'+story.author,permissions)
			?  dataSources.StoryAPI.addStory(story)
			: ERRORS.PERMISSION_DENIED						
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
			return await dataSources.StoryAPI.getStoryByIds(parent.story);
        }
	},
	StoryResult: resultResolver('Story'),
	CurrentStoryResult: resultResolver('CurrentStory'),
	ResponseResult: resultResolver('Response')
};

module.exports = { queries, mutations, fieldResolvers };