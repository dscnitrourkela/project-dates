const Clubs = require('./club.model.js');
const Events = require('../events/event.model.js');
const { DataSource } = require('apollo-datasource');
const AccessLevelAPI = require('../accessLevels/accessLevel.datasources.js');
const { INVALID_INPUT } = require('../../errors/index.js');

/**
 * @class
 * @classdesc This class contains all the database functions for the clubs
 */
class ClubAPI extends DataSource {
	// async getClubs(args) {
	// 	const ans = await Clubs.find(args);
	// 	return ans;
	// }
	
	getClubById(id) {
		return Clubs.findById(id);
	}
	/**
	 * Returns an array of resolved club events
	 * @param {Array} eventArray array of event ids to be resolved
	 * @returns {Array} array of resolved event objects
	 */
	resolveClubEvents(eventArray) {
		return Events.find({
			_id: { $in: eventArray },
		});
	}

	/**
	 * Creates a club in the database with the given details.
	 * 
	 * @param {Object} club input club
	 * @returns {Object} created club
	 * @todo Remove unnecessary comments if not needed
	 */
	async addClub(club) {
		let retPromise = {};
		// Create club with basic types;
		const createdClub = await Clubs.create({
			clubName: club.clubName,
			facAd: club.facAd,
			description: club.description,
			theme:club.theme,
			society: club.society,
			domain: club.domain,
			links: club.links,			
			contactInfo: club.contactInfo
		});

		// //Add nested types
		// const clubId = createdClub._id;
		// const accessArray = club.memberAccess;
		// const AccessLevels = new AccessLevelAPI();
		// if (accessArray != undefined && accessArray.length > 0) {
		// 	await Promise.all(
		// 		accessArray.map(async (accessItem, index) => {
		// 			accessItem.club=clubId;
		// 			await AccessLevels.addAccessLevel(accessItem);
		// 		})
		// 	);
		// }

		// const eventsArray = club.events;
		// if (eventsArray != undefined && eventsArray.length > 0) {
		// 	await Promise.all(
		// 		eventsArray.map(async (eventItem, index) => {
		// 			const eventId = eventItem;
		// 			const foundEvent = await Events.findById(eventId);
		// 			createdClub.events.push(foundEvent._id);
		// 			foundEvent.Organizer = clubId;
		// 			await foundEvent.save();
		// 		})
		// 	);
		// }
		retPromise = await createdClub.save();
		return retPromise;
	}

	/**
	 * updates the club in the database with the given details.
	 * 
	 * @param {Object} args input club
	 * @returns {Object} created club
	 * @throws will throw an error if the club is not found
	 */
	async updateClub(args) {
		const clubId = args.id;
		const {club} = args;
		let retPromise = {};
		let foundClub;
		try{
			foundClub = await Clubs.findById(clubId);
			if(foundClub===undefined){
				return {...INVALID_INPUT, message:"Club Not Found"};
			}
		}catch(e){
			return {...INVALID_INPUT, message:e.message};
		}
		let updatedClub = new Clubs(foundClub);
		updatedClub = Object.assign(updatedClub, club);
		updatedClub = new Clubs(updatedClub);

		//Add nested types
		// const accessArray = club.memberAccess;
		// const AccessLevels = new AccessLevelAPI();
		// if (accessArray != undefined && accessArray.length > 0) {
		// 	// accessArray exists and not empty
		// 	await Promise.all(
		// 		accessArray.map(async (accessItem, index) => {
		// 			const userId = accessItem.user;
		// 			const foundUser = await Users.findById(userId);
		// 			const foundAccessObj=await AccessLevel.findOne({user:userId,club:foundClub._id});
		// 			//Check if there is no such access level defined
		// 			if(foundAccessObj==undefined){
		// 				accessItem.club=clubId;
		// 				await AccessLevels.addAccessLevel(accessItem);
		// 			}
		// 			else{
		// 				await  AccessLevels.updateAccessLevel(accessItem);
		// 			}
		// 		})
		// 	);
		// }

		// const eventsArray = club.events;
		// if (eventsArray != undefined && eventsArray.length > 0) {
		// 	// eventsArray exists and not empty
		// 	await Promise.all(
		// 		eventsArray.map(async (eventItem, index) => {
		// 			const eventId = eventItem;
		// 			const foundEvent = await Events.findById(eventId);
		// 			updatedClub.events.push(foundEvent._id);
		// 			foundEvent.Organizer = clubId;
		// 			await foundEvent.save();
		// 		})
		// 	);
		// }
		retPromise = await updatedClub.save();
		return retPromise;
	}

	/**
	 * deletes the club from the database with the given id.
	 * And also removes the club entry from the clubAccess array of each user
	 * @param {String} id input club id
	 * @returns {Object} A success response
	 * @throws will throw an error if the club is not found
	 */
	async deleteClub(id) {		
		let foundClub;
		try{
			foundClub = await Clubs.findById(id);
			if(foundClub===undefined){
				return {...INVALID_INPUT, message:"Club Not Found"};
			}
		}catch(e){
			return {...INVALID_INPUT, message:e.message};
		}
		
		const accessArray = foundClub.memberAccess;
		const AccessLevels = new AccessLevelAPI();
		// accessArray exists and not empty
		await Promise.all(
			accessArray.map(async accessItem => {
				await AccessLevels.deleteAccessLevelFromUser(accessItem);
			})
		);		
		await foundClub.deleteOne();
		return {success:true};
	}
}

module.exports = ClubAPI;