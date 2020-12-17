/** @format */

const Events = require('../models/event.js');
const Stories = require('../models/story.js');
const currentStories = require("../models/currentStory");
const Users = require('../models/user.js');
const Clubs = require('../models/club.js');
const Venues = require('../models/venue.js');
const AccessLevel = require('../models/accessLevel.js');
const { DataSource } = require('apollo-datasource');
const { ApolloError } = require('apollo-server');

class StoryAPI extends DataSource {
	constructor() {
		super();
	}
    initialize(config) {}
    getStories(args) {
		return Stories.find(args);
	}
	async getCurrentStories() {
        let activeStories=await currentStories.find();
        return activeStories;        
	}
	async addStory(story) {
		let retPromise = {};
		// Create Event with basic types;
		let createdStory = await Stories.create({
			asset: story.asset,
            description: story.description,
            isExpired:false
		});

		//Add nested types

		//1. author
		if (story.author != undefined) {
			const authorId = story.author;
            const foundAuthor = await Clubs.findById(authorId);
            if(foundAuthor==undefined){
                return new ApolloError("Author Not Found");
            }
            createdStory.author = foundAuthor._id;

            //add to current Stories
            await currentStories.create({
                storyAsset:story.asset,                
                authorLogo: foundAuthor.logo,
                authorName: foundAuthor.clubName,
                storyID: createdStory._id
            })  
            
        }else{
            return new ApolloError("Author Not Given");
        }

        //2. event
		if (story.event != undefined) {
			const eventId = story.event;
			const foundEvent = await Events.findById(eventId);
            if(foundEvent==undefined){
                return new ApolloError("Event Not Found");
            }
            createdStory.event = foundEvent._id;
        }
        
       

		retPromise = await createdStory.save();
		return retPromise;
    }
    
    async deleteStory(story){
        await Stories.deleteOne({ "_id" : story.id } )
        await currentStories.deleteOne({ "storyID" : story.id } )
        return {success:true}
    }

}
module.exports = StoryAPI;
