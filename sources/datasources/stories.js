/** @format */
const mongoose = require('mongoose');
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
        let currentStoriesListMap= new Array();
        let visitedClub= new Map();
        currentStoriesList.map((each)=>{
            if(visitedClub[each.authorId]!=null) {
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
                authorId: foundAuthor._id,
                authorLogo: foundAuthor.logo,
                authorName: foundAuthor.clubName,                
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

    async getStoryByIds(ids){
        return Stories.find({
            '_id': { $in: ids.map((id)=>mongoose.Types.ObjectId(id) )}
        });
    }
    
    async deleteStory(story){
        await currentStories.deleteOne({ "_id" : story.id } );
        let foundStory=await currentStories.findOne({ "_id" : story.id });
        await foundStory.deleteOne({ "_id" : foundStory.storyId } )
        return {success:true}
    }

}
module.exports = StoryAPI;
