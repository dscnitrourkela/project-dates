/** @format */

const Users = require('../users/user.model.js');
const Clubs = require('../clubs/club.model.js');
const AccessLevel = require('../accessLevels/accessLevel.model.js');
const { DataSource } = require('apollo-datasource');
const admin = require('firebase-admin');
const { ApolloError } = require('apollo-server');
const firebase = require("../../helpers/firebase");
const { INVALID_INPUT } = require('../../errors/index.js');

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
			let newUser = await Users.create({
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
				name:newUser.name,				
				user: newUser,
			};
			const createdAccessLevel = await AccessLevel.create(accessLevelObj);
			await newUser.clubAccess.push(createdAccessLevel);
			await newUser.save();
			if(process.env.NODE_ENV!="test")
				firebase.updateJWT(uid,{mongoID:newUser._id});
			incomingUser= await Users.findOne({firebaseUID:uid})
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
		const response=await Users.deleteOne({firebaseUID:uid});
		if(process.env.NODE_ENV!="test")
			await firebase.deleteUser(uid);
		if(response.n===0)
			return {...INVALID_INPUT,message:"User Not Found"};
		else
			return {success:true};
	}
}
module.exports = UserAPI;
