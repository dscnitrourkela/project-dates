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
const { INVALID_INPUT } = require('../errors/index.js');

class StoryAPI extends DataSource {
	constructor() {
		super();
	}
    initialize(config) {}
    getStories(args) {
        delete Object.assign(args, {["_id"]: args["id"] })["id"];
		return Stories.find(args);
	}
	async getCurrentStories() {
        let currentStoriesList=await currentStories.find();
        return currentStoriesList;        
	}
	async addStory(story) {
		let retPromise = {};
		// Create Event with basic types;
		let createdStory = await Stories.create({
            asset: story.asset,
            assetType: story.assetType,
            description: story.description,
            isExpired:false
		});

		//Add nested types

		//1. author
		if (story.author != undefined) {
			const authorId = story.author;
            const foundAuthor = await Clubs.findById(authorId);
            if(foundAuthor==undefined){
                return {...INVALID_INPUT, message:"Author Not Found"};
            }
            createdStory.author = foundAuthor._id;

            //add to current Stories
            await currentStories.create({
                asset:story.asset,                
                authorLogo: foundAuthor.logo,
                authorName: foundAuthor.clubName,
                assetType: story.assetType,
                story: createdStory._id
            })  
            
        }else{
            return {...INVALID_INPUT, message:"Author Not Given"};
        }

        //2. event
		if (story.event != undefined) {
            const eventId = story.event;
            let foundEvent;
            try{
                foundEvent = await Events.findById(eventId);                
            }catch(error){
                return {...INVALID_INPUT, message:"Invalide Event ID"};
            }			            
            if(foundEvent==undefined){
                return {...INVALID_INPUT, message:"Event Not Found"};
            }
            createdStory.event = foundEvent._id;
        }
		retPromise = await createdStory.save();
		return retPromise;
    }

    async getStoryById(id){
        return await Stories.findById(id);
    }
    
    async deleteStory(story){
        await currentStories.deleteOne({ "_id" : story.id } )
        return {success:true}
    }

}
module.exports = StoryAPI;
