/** @format */

const AccessLevels = require('../models/accessLevel.js');
const Clubs = require('../models/club.js');
const Users = require('../models/user.js');
const { DataSource } = require('apollo-datasource');

class AccessLevelAPI extends DataSource {
	constructor() {
		super();
	}
	initialize(config) {}
	async resolveAccess(accessArray) {
		return await AccessLevels.find({
			_id: { $in: accessArray },
		});
	}
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
		let createdAccessLevel = await AccessLevels.create(accessObj);
		foundClub.memberAccess.push(createdAccessLevel);
		foundUser.clubAccess.push(createdAccessLevel);
		await foundUser.save();
		await foundClub.save();
		return createdAccessLevel;
 	}

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

    
    async deleteAccessLevel(id){
		const foundAccessLevel= await AccessLevels.findById(id);
		const userId = foundAccessLevel.user;
		const clubId = foundAccessLevel.club;
		const foundUser = await Users.findById(userId);
		const foundClub = await Clubs.findById(clubId);
		foundUser.clubAccess = foundUser.clubAccess.filter((access)=>access._id!=id)
		foundClub.memberAccess = foundClub.memberAccess.filter((access)=>access._id!=id)
		await foundUser.save();
		await foundClub.save();
		return await foundAccessLevel.remove();
    }
}

module.exports = AccessLevelAPI;
