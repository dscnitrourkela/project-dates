const mongoose = require('mongoose');
const Events = require('../events/event.model.js');
const Stories = require('./story.model.js');
const currentStories = require("../currentStories/currentStory.model");
const Clubs = require('../clubs/club.model.js');
const { DataSource } = require('apollo-datasource');
const { INVALID_INPUT } = require('../../errors/index.js');

/**
 * @class
 * @classdesc This class contains all the database functions for the stories
 */
class StoryAPI extends DataSource {
    /**
    * @typedef {Object} currentStories
    * @property {String} authorLogo
    * @property {String} authorId
    * @property {String} authorName
    * @property {Object} story
     */
    
    // getStories(args) {
    //     delete Object.assign(args, {["_id"]: args["id"] })["id"];
	// 	return Stories.find(args);
    // }
    
    /**
     * This function fetches all the active stories from the database.
     * It fetches all the current stories from the currentStories collection and
     * groups them club wise     *         
     * @returns {currentStories} array of current stories grouped club wise
     */
	async getCurrentStories() {
        const currentStoriesList=await currentStories.find();
        const currentStoriesListMap= new Array();
        const visitedClub= new Map();
        currentStoriesList.map(each => {
            if(visitedClub[each.authorId]!==undefined) {
                currentStoriesListMap[visitedClub[each.authorId]].story.push(each.story);
            }else{
                visitedClub[each.authorId]=currentStoriesListMap.length;
                currentStoriesListMap.push({
                    authorId: each.authorId,
                    authorLogo: each.authorLogo,
                    authorName: each.authorName,
                    story:[each.story]
                })
            }
        })
        return currentStoriesListMap;        
    }
    /**
     * This function adds the story to the stories collection and 
     * transforms the story object to fit in the currentStories collection.
     * Finally it links an event to the story if provided.
     * @param {story} story 
     * @returns {story} created story
     * @throws Will throw an error if the club is not found
     * @throws Will throw an error if a event to be linked is not found
     */
	async addStory(story) {
        let retPromise = {};
        
        
		//Add nested types

		//1. author
		const authorId = story.author;
        const foundAuthor = await Clubs.findById(authorId);
        if(foundAuthor===null){
            return {...INVALID_INPUT, message:"Author Not Found"};
        }
        // Create Event with basic types;
        const createdStory = await Stories.create({
            asset: story.asset,
            assetType: story.assetType,
            description: story.description
        });
        createdStory.author = foundAuthor._id;
        //add to current Stories
        await currentStories.create({
            authorId: foundAuthor._id,
            authorLogo: foundAuthor.theme.map(e => ({ name: e.name, logo: e.logo })),
            authorName: foundAuthor.clubName,                
            story: createdStory._id
        })  

        //2. event
		if (story.event !== undefined) {
            const eventId = story.event;
            let foundEvent;
            try{
                foundEvent = await Events.findById(eventId);                
            }catch(error){
                return {...INVALID_INPUT, message:"Invalide Event ID"};
            }			            
            if(foundEvent===null){
                return {...INVALID_INPUT, message:"Event Not Found"};
            }
            createdStory.event = foundEvent._id;
        }
		retPromise = await createdStory.save();
		return retPromise;
    }

    // async getStoryById(id){
    //     return await Stories.findById(id);
    // }

    getStoryByIds(ids){
        return Stories.find({
            '_id': { $in: ids.map(id => mongoose.Types.ObjectId(id) )}
        });
    }
    /**
     * This function deletes the story from both the stories and currentStories collection.
     * @param {story} story 
     * @returns {Object} A success response if the story is deleted successfully
     * @throws Will throw an error if the story is not found
     */
    async deleteStory(story){
        const deleteResponse=await currentStories.deleteOne({ "story" : story.id });
        if (deleteResponse.n === 0) {
            return {...INVALID_INPUT,message:"Story Not Found"};
        } 
        await Stories.deleteOne({ "_id" : story.id })
        return {success:true};
    }

}
module.exports = StoryAPI;
