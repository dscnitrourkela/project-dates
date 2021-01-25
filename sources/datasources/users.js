/** @format */

const Users = require('../models/user.js');
const Clubs = require('../models/club.js');
const AccessLevel = require('../models/accessLevel.js');
const { DataSource } = require('apollo-datasource');
const admin = require('firebase-admin');
const { ApolloError } = require('apollo-server');
const {updateJWT} = require("../helpers/firebase");

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
		let incomingUser;		
		const exisitingUser=await Users.findOne({firebaseUID:uid});
		// User document exists
		if(exisitingUser){
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
			const accessLevelObj = {
				level: '1',
				name:incomingUser.name,				
				user: incomingUser,
			};
			const createdAccessLevel = await AccessLevel.create(accessLevelObj);
			await incomingUser.clubAccess.push(createdAccessLevel);
			await incomingUser.save();
			if(process.env.NODE_ENV!="test")
				await updateJWT(uid,{mongoID:incomingUser._id});
		}
		return incomingUser;		
	}
	async updateUser(args,uid) {
		const user = args.user;
		let retPromise = {};
		const foundUser = await Users.findOne({firebaseUID:uid});
		let updatedUser = new Users(foundUser);
		updatedUser = Object.assign(updatedUser, user);
		updatedUser = new Users(updatedUser);
		
		let regex=/^(1|2|3|4|5|7)[0-9][0-9]((AR|AS|BM|BT|CH|CE|CR|CS|CY|EC|EI|EE|ER|FP|HS|ID|LS|MA|ME|MN|MM|PA|PH|SM)|(ar|as|bm|bt|ch|ce|cr|cs|cy|ec|ei|ee|er|fp|hs|id|ls|ma|me|mn|mm|pa|ph|sm))[0-9]{4}$/;
		if( user.instituteId!=undefined&&foundUser.instituteId==undefined){
			// if(regex.test(user.instituteId)==false){
			// 	return new ApolloError("Invalid Institute ID");
			// }
			const email=user.instituteId+'@nitrkl.ac.in';
			// Firebase Email Auth provider needs to be checked before updating Level
			// Error handling also needs to be done
			const accessLevelObj = {
				level: '2',
				name:updatedUser.name,				
				user: updatedUser,
			};
			const createdAccessLevel = await AccessLevel.create(accessLevelObj);
			await updatedUser.clubAccess.push(createdAccessLevel);
			await updatedUser.save();
		}
		retPromise = await updatedUser.save();
		return retPromise;		
	}
	async deleteUser(uid) {
		const foundUser = await Users.find({firebaseUID:uid});;
		return await foundUser.deleteOne();
	}
}
module.exports = UserAPI;
