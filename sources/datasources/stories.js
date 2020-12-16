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
        let storyArray=await Stories.find({isExpired:{$eq: false}});
        console.log(storyArray[0]);
        //Not keeping it in await so that it happens asynchronously
        await Promise.all(
            storyArray.map(async (storyItem, index) => {
                const currentTime=new Date();
                let storyCreatedAt=new Date(storyItem.createdAt);
                const storyDuration = 24*60; //minutes
                let expiryTime = new Date();
                expiryTime.setMinutes(storyCreatedAt.getMinutes() + storyDuration);
                if(expiryTime<currentTime){
                    console.log("yes");
                    storyItem.isExpired=true;
                    let updatedStoryItem = new Stories(storyItem);
                    updatedStoryItem.isExpired = true;
                    await updatedStoryItem.save({timestamps:false});
                }
            })
        );
        console.log("storyArray");
        return storyArray.filter(story => story.isExpired==false);
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
             //3. add to current Stories
            await currentStories.create({
                storyID:createdStory._id,
                authorName: foundAuthor.clubName
            }).then((createdObj)=>{
                console.log(createdObj);
            })
            if(foundAuthor==undefined){
                return new ApolloError("Author Not Found");
            }
            createdStory.author = foundAuthor._id;
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

}
module.exports = StoryAPI;
