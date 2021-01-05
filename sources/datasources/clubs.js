/** @format */

const Clubs = require('../models/club.js');
const Users = require('../models/user.js');
const Events = require('../models/event.js');
const AccessLevel = require('../models/accessLevel.js');
const { DataSource } = require('apollo-datasource');

class ClubAPI extends DataSource {
	constructor() {
		super();
	}
	initialize(config) {}
	async getClubs(args) {
		const ans = await Clubs.find(args);
		return ans;
	}
	getClubById(id) {
		return Clubs.findById(id);
	}

	async resolveClubEvents(eventArray) {
		return await Events.find({
			_id: { $in: eventArray },
		});
	}

	async addClub(club) {
		let retPromise = {};
		// Create club with basic types;
		let createdClub = await Clubs.create({
			clubName: club.clubName,
			facAd: club.facAd,
			logo: club.logo,
			society: club.society,
			domain: club.domain,
			links: club.links,
			backgroundColor: club.backgroundColor
		});

		//Add nested types
		const clubId = createdClub._id;
		const accessArray = club.memberAccess;
		if (accessArray != undefined && accessArray.length > 0) {
			await Promise.all(
				accessArray.map(async (accessItem, index) => {
					const userId = accessItem.user;
					const foundUser = await Users.findById(userId);
					const accessObj = {
						level: accessItem.level,
						name:foundUser.name,
						relation:accessItem.relation,
						user: foundUser._id,
						club: clubId,
					};
					let createdAccessLevel = await AccessLevel.create(accessObj);
					createdClub.memberAccess.push(createdAccessLevel);
					foundUser.clubAccess.push(createdAccessLevel);
					await foundUser.save();
				})
			);
		}

		const eventsArray = club.events;
		if (eventsArray != undefined && eventsArray.length > 0) {
			await Promise.all(
				eventsArray.map(async (eventItem, index) => {
					const eventId = eventItem;
					const foundEvent = await Events.findById(eventId);
					createdClub.events.push(foundEvent._id);
					foundEvent.Organizer = clubId;
					await foundEvent.save();
				})
			);
		}
		retPromise = await createdClub.save();
		return retPromise;
	}

	async updateClub(args) {
		const clubId = args.id;
		const club = args.club;
		let retPromise = {};
		const foundClub = await Clubs.findById(clubId);
		let updatedClub = new Clubs(foundClub);
		updatedClub = Object.assign(updatedClub, club);
		updatedClub = new Clubs(updatedClub);

		//Add nested types
		const accessArray = club.memberAccess;
		if (accessArray != undefined && accessArray.length > 0) {
			// accessArray exists and not empty
			await Promise.all(
				accessArray.map(async (accessItem, index) => {
					const userId = accessItem.user;
					const foundUser = await Users.findById(userId);
					const foundAccessObj=await AccessLevel.findOne({user:userId,club:foundClub._id});
					//Check if there is no such access level defined
					if(foundAccessObj==undefined){
						const accessObj = {
							level: accessItem.level,
							name:foundUser.name, //You cannot update name here
							relation:accessItem.relation,
							user: foundUser._id,
							club: clubId,
						};
						let createdAccessLevel = await AccessLevel.create(accessObj);
						updatedClub.memberAccess.push(createdAccessLevel);
						foundUser.clubAccess.push(createdAccessLevel);
						await foundUser.save();
					}
					else{
						let updatedAccessObj = new AccessLevel(foundAccessObj);
						delete accessItem.user; //To avoid user._id update in Object.assign()
						delete accessItem.club; //To avoid club._id update in Object.assign()
						delete accessItem.name; //To avoid user.name update in Object.assign()
						updatedAccessObj = Object.assign(updatedAccessObj,accessItem);
						updatedAccessObj.save();
					}
				})
			);
		}

		const eventsArray = club.events;
		if (eventsArray != undefined && eventsArray.length > 0) {
			// eventsArray exists and not empty
			await Promise.all(
				eventsArray.map(async (eventItem, index) => {
					const eventId = eventItem;
					const foundEvent = await Events.findById(eventId);
					updatedClub.events.push(foundEvent._id);
					foundEvent.Organizer = clubId;
					await foundEvent.save();
				})
			);
		}
		retPromise = await updatedClub.save();
		return retPromise;
	}

	async deleteClub(id) {
		const foundClub = await Clubs.findById(id);
		return await foundClub.remove();
	}
}

module.exports = ClubAPI;
