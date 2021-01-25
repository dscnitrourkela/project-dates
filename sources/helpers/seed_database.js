/**
 * Seeding module
 *
 * @format
 * @module Seed Database
 */

const user = require('../models/user');
const event = require('../models/event');
const accessLevel = require('../models/accessLevel');
const club = require('../models/club');
const venue = require('../models/venue');
const story = require('../models/story');
const permission = require('../models/permission');
const mongoose = require('mongoose');
const { createTestClient } = require('apollo-server-testing');

//method to drop the collection if it exists
const dropIfExists = async (collectionVariable) => {
	try {
		await collectionVariable.collection.drop();
	} catch (err) {
		if (err.message !== 'ns not found') {
			throw err;
		}
	}
};

const userList = [
	{
		name: 'Harish',
		username: 'HarishTeens',
		firebaseUID:"aasdf"
	},
	{
		name: 'Roshan',
		username: 'Rk shaw',
		firebaseUID:"aasdf1"
	},
	{
		name: 'Smarak Das',
		username: 'Smarky',
		firebaseUID:"aasdf2"
	},
	{
		name: 'CHinmay Kabi',
		username: 'chinukabi',
		firebaseUID:"aasdf3"
	},
	{
		name: 'Abel Mathew',
		username: 'Designer Knight',
		firebaseUID:"aasdf32"
	},
];
const clubList = ['DSC', 'GDG', 'MCC', 'RED', 'BLUE'];
const eventList = ['Hactoberfest', 'Hackathon', 'RUNIO', 'Fest', 'Enigma'];
const venueList = ['LA-204', 'RM-Hall', 'BBA', 'LA-lawns', 'Library-Lawns'];
const storyDescriptionList = ['Hactoberfest Story', 'Hackathon Story', 'RUNIO Story', 'Fest Story', 'Enigma Story'];
const seedData = async () => {
	await dropIfExists(user);
	await dropIfExists(club);
	await dropIfExists(event);
	await dropIfExists(venue);
	await dropIfExists(story);
	await dropIfExists(accessLevel);	

	Promise.all(
		userList.map(async (data, index) => {
			let createdUser = await user.create(data);
			const createdClub = await club.create({
				clubName: clubList[index],
			});
			const accessLevelObj = {
				level: '1',
				name:data.name,
				relation:'member',
				club: createdClub,
				user: createdUser,
			};
			const createdAccessLevel = await accessLevel.create(accessLevelObj);

			await createdClub.memberAccess.push(createdAccessLevel);
			await createdClub.save();
			await createdUser.clubAccess.push(createdAccessLevel);
			await createdUser.save();
			const createdEvent = await event.create({
				eventName: eventList[index],
			});
			const createdVenue = await venue.create({
				name: venueList[index],
			});
			const createdStory = await story.create({
				author:createdClub,
				event:createdEvent,
				description:storyDescriptionList[index],
				asset:'Dummy Asset'
			});
		})
	);
};
// const seedData= async ()=>{}
//     let createdUser=await user.create(userList[0]);
// }

//
/**
 *  A function to seed the database with default permission for the the default role
 */
const seedPermissions = async () => {
	await dropIfExists(permission);
	
	permission.find({ role: 'LEVEL1' }, async (err, found) => {
		if (!found.length) {
			await permission.create({
				role: 'LEVEL1',
				permissions: ['clubs.all', 'clubs.byId', 'clubs.byName'],
			});
		}
	});
};

const clubSeeder = async () =>{
	const createdClub = await club.create({
		clubName: "Avengers",
		theme:[{
			name:"light",
			logo:"lightlogo"
		},{
			name:"dark",
			logo:"darklogo"
		}]
	});
	return {
		id:createdClub._id,
		clubName: createdClub.clubName,
		theme: createdClub.theme
	};
	
}

const eventSeeder=async ()=>{
	const createdEvent=await event.create({
		eventName: "Bazingaa",
	})
	return {
		id: createdEvent._id,
		eventName:createdEvent.eventName
	}
}
module.exports = {
	seedData,
	seedPermissions,
	clubSeeder,
	eventSeeder
};
