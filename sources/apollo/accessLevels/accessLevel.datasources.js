const AccessLevels = require('./accessLevel.model.js');
const Clubs = require('../clubs/club.model.js');
const Users = require('../users/user.model.js');
const { DataSource } = require('apollo-datasource');

/**
 * @class
 * @classdesc This class contains all the datasources method for AccessLevel API
 */
class AccessLevelAPI extends DataSource {
	
	/**
	 * Returns an array of resolved Access Levels
	 * @param {Array} accessArray array of ids to be resolved
	 * @returns {Array} array of resolved access level objects
	 */
	resolveAccess(accessArray) {
		return AccessLevels.find({
			_id: { $in: accessArray },
		});
	}
	/**
	 * This method adds the given access level object and syncs it with both the user and club document.
	 * It pushes the id to clubAcess of User document and memberAcess of Club document
	 * @param {Object} passedAccessLevel input access level object
	 * @returns {Object} created access level object
	 */
	async addAccessLevel(passedAccessLevel) {
		const userId = passedAccessLevel.user;
		const clubId = passedAccessLevel.club;
		const foundUser = await Users.findById(userId);
		const foundClub = await Clubs.findById(clubId);
		const accessObj = {
			level: passedAccessLevel.level,
			name:foundUser.name,
			relation:passedAccessLevel.relation,
			user: foundUser._id,
			club: clubId,
		};
		const createdAccessLevel = await AccessLevels.create(accessObj);
		foundClub.memberAccess.push(createdAccessLevel);
		foundUser.clubAccess.push(createdAccessLevel);
		await foundUser.save();
		await foundClub.save();
		return createdAccessLevel;
 	}
	/**
	 * @param {Object} passedAccessLevel input access level object
	 * @returns {Object} updated access level object
	 */
	async updateAccessLevel(passedAccessLevel) {
		const accessLevelId = passedAccessLevel.id;
		const foundAccessLevel = await AccessLevels.findById(accessLevelId);
		let updatedAccessLevel = new AccessLevels(foundAccessLevel);
		delete passedAccessLevel.user; //To avoid user._id update in Object.assign()
		delete passedAccessLevel.club; //To avoid club._id update in Object.assign()
		delete passedAccessLevel.name; //To avoid user.name update in Object.assign()
		updatedAccessLevel = Object.assign(updatedAccessLevel,passedAccessLevel);
		return updatedAccessLevel.save();
	}

    /**
	 * @param {Object} id id of the access level object to be deleted
	 * @returns {Object} deleted access level object
	 */
    async deleteAccessLevel(id){
		const foundAccessLevel= await AccessLevels.findById(id);
		const userId = foundAccessLevel.user;
		const clubId = foundAccessLevel.club;
		const foundUser = await Users.findById(userId);
		const foundClub = await Clubs.findById(clubId);
		foundUser.clubAccess = foundUser.clubAccess.filter(access => access._id!==id)
		foundClub.memberAccess = foundClub.memberAccess.filter(access => access._id!==id)
		await foundUser.save();
		await foundClub.save();
		return foundAccessLevel.deleteOne();
	}
	/**
	 * This is called when deleting a club or any particular instance where the accesslevels from 
	 * the clubs need not be deleted, as the entire club is going to be deleted
	 * @param {Object} id id of the access level object to be deleted
	 * @returns {Object} deleted access level object
	 */
	async deleteAccessLevelFromUser(id){
		const foundAccessLevel = await AccessLevels.findById(id);
		const userId = foundAccessLevel.user;
		const foundUser = await Users.findById(userId);
		// eslint-disable-next-line eqeqeq
		foundUser.clubAccess = foundUser.clubAccess.filter(access => access._id!=id)
		await foundUser.save();
		return foundAccessLevel.deleteOne();
    }
}

module.exports = AccessLevelAPI;
