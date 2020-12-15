/** @format */

const Users = require('../models/user.js');
const Clubs = require('../models/club.js');
const AccessLevel = require('../models/accessLevel.js');
const { DataSource } = require('apollo-datasource');
const admin = require('firebase-admin');
const { ApolloError } = require('apollo-server');

class UserAPI extends DataSource {
	constructor() {
		super();
	}

	initialize(config) {}
	async getUsers(args) {
		return await Users.find(args);
	}
	async getUserById(id) {
		return await Users.findById(id);
	}
	async getUserByUsername(username) {
		return await Users.findOne({ username: username });
	}

	async authUser(user,uid) {
		let retPromise = {}, incomingUser;
		// Create user with basic types;
		const exisitingUser=await Users.findOne({firebaseUID:uid});
		// User document exists
		if(exisitingUser.length>0){
			incomingUser=exisitingUser;
		}else{
			incomingUser = await Users.create({
				username: user.username,
				name: user.name,
				gmailAuthMail: user.gmailAuthMail,
				instituteId: user.instituteId,
				address: user.address,
				mobile: user.mobile,
				firebaseUID : uid,	
				emergencyContact: user.emergencyContact,
				displayPicture: user.displayPicture,
			});
		}
		return incomingUser;
		//Add nested types
		// const userId = incomingUser._id;
		// const accessArray = user.clubAccess;
		// if (accessArray != undefined && accessArray.length > 0) {
		// 	await Promise.all(
		// 		accessArray.map(async (accessItem, index) => {
		// 			const clubId = accessItem.club;
		// 			const foundClub = await Clubs.findById(clubId);
		// 			const accessObj = {
		// 				level: accessItem.level,
		// 				club: foundClub._id,
		// 				user: userId,
		// 			};
		// 			let createdAccessLevel = await AccessLevel.create(accessObj);
		// 			incomingUser.clubAccess.push(createdAccessLevel);
		// 			foundClub.memberAccess.push(createdAccessLevel);
		// 			await foundClub.save();
		// 		})
		// 	);
		// }
		// retPromise = await incomingUser.save();
		// return retPromise;
		
	}

	async updateUser(args,uid) {
		const userId = args.id;
		const user = args.user;
		let retPromise = {};
		// Create user with basic types;
		const foundUser = await Users.findOne({firebaseUID:uid});;
		const originalMemberAccess = foundUser.clubAccess.slice(0);

		let updatedUser = new Users(foundUser);
		updatedUser = Object.assign(updatedUser, user);
		updatedUser = new Users(updatedUser);
		
		//Add nested types
		// const accessArray = user.clubAccess;
		// if (accessArray != undefined && accessArray.length > 0) {
		// 	// accessArray exists and is not empty
		// 	await Promise.all(
		// 		accessArray.map(async (accessItem, index) => {
		// 			const clubId = accessItem.club;
		// 			const foundClub = await Clubs.findById(clubId);
		// 			const accessObj = {
		// 				level: accessItem.level,
		// 				club: foundClub._id,
		// 				user: userId,
		// 			};
		// 			let createdAccessLevel = await AccessLevel.create(accessObj);
		// 			updatedUser.clubAccess.push(createdAccessLevel._id);
		// 			foundClub.memberAccess.push(createdAccessLevel._id);
		// 			await foundClub.save();
		// 		})
		// 	);
		// }
		let regex=/^(1|2|3|4|5|7)[0-9][0-9]((AR|AS|BM|BT|CH|CE|CR|CS|CY|EC|EI|EE|ER|FP|HS|ID|LS|MA|ME|MN|MM|PA|PH|SM)|(ar|as|bm|bt|ch|ce|cr|cs|cy|ec|ei|ee|er|fp|hs|id|ls|ma|me|mn|mm|pa|ph|sm))[0-9]{4}$/;
		if( user.instituteId!=undefined&&foundUser.instituteId==undefined){
			if(regex.test(user.instituteId)==false){
				return new ApolloError("Invalid Institute ID");
			}
			const email=user.instituteId+'@nitrkl.ac.in';
			const claimSuccessResponse= await this.updateCustomClaim(email,uid);
			if(claimSuccessResponse==false){
				return  new ApolloError("Role Update Failed");;
			}
		}
		retPromise = await updatedUser.save();
		return retPromise;
		
	}

	async deleteUser(uid) {
		const foundUser = await Users.find({firebaseUID:uid});;
		return await foundUser.remove();
	}

	/**
	 * Firebase CustomClaim:  Use this function to update users from level 1 to level 2
	 *  @param {string} email - NITR mail id of the user
	 */ 
	async updateCustomClaim(email,uid){
		admin
		.auth()
		.getUserByEmail(email)
		.then((userRecord) => {     
			const customClaims={
				role:"LEVEL2"
			}
			admin.auth().setCustomUserClaims(uid, customClaims)
			.then(() => {
				console.log("Set "+customClaims.role+" for "+userRecord.displayName+" Success");
				return true;
			})
			.catch(error => {
				console.log("Set "+customClaims.role+" for "+userRecord.displayName+" Failure");
				return false;
			});
		})
		.catch((error) => {
			console.log('Error fetching user data:', error);
			return false;
		});
	}
}
module.exports = UserAPI;
