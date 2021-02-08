

const ERRORS = require('../../errors');
const {resultResolver,resolverHelper} = require("../../helpers/apollo");

const queries = {
	// storiesByField: (parent, args, { dataSources }, info) => {
	// 	return dataSources.StoryAPI.getStories(args);
    // },
    currentStories: (parent, args, { dataSources, permissions, error }) =>
		resolverHelper(error,'stories.view',permissions) 
			? dataSources.StoryAPI.getCurrentStories()
			: [ERRORS.PERMISSION_DENIED]
	,
	deleteStory: (parent, args, { dataSources,permissions, error }) =>
		resolverHelper(error, 'stories.delete$' + args.author, permissions) 
		? dataSources.StoryAPI.deleteStory(args)
		: ERRORS.PERMISSION_DENIED											
	
};

const mutations = {
	addStory: async (parent, { story }, { dataSources ,permissions,error}) => {
		if(story===undefined || story.author===undefined){
            return {...ERRORS.INVALID_INPUT, message:"Input Story must have author"}
		}
		return resolverHelper(error, 'stories.add$'+story.author,permissions)
			? dataSources.StoryAPI.addStory(story)
			: ERRORS.PERMISSION_DENIED						
	}
};

const fieldResolvers = {
	Story: {
		author: (parent, args, { dataSources }) => 
			dataSources.ClubAPI.getClubById(parent.author)
        ,
        event: (parent, args, { dataSources }) =>
			dataSources.EventAPI.getEventById(parent.event)
		,
	},
	CurrentStory: {
		story: (parent, args, { dataSources }) =>
			dataSources.StoryAPI.getStoryByIds(parent.story)
        
	},
	StoryResult: resultResolver('Story'),
	CurrentStoryResult: resultResolver('CurrentStory'),
	ResponseResult: resultResolver('Response')
};

module.exports = { queries, mutations, fieldResolvers };