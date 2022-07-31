const Users = require('../users/user.model.js');
const AccessLevel = require('../accessLevels/accessLevel.model.js');
const { DataSource } = require('apollo-datasource');
const firebase = require("../../helpers/firebase");
const { INVALID_INPUT } = require('../../errors/index.js');

/**
 * @class
 * @classdesc This class contains all the database functions for the users
 */
class UserAPI extends DataSource {
	getUsers(args) {
		return Users.find(args);
	}
	getUserById(id) {
		return Users.findById(id);
	}
	getUserByUsername(username) {
		return Users.findOne({ username });
	}
	async updateUserAfterSignUp(newUser,uid) {
		const accessLevelObj = {
			level: '1',
			name:newUser.name,				
			user: newUser
		};
		const createdAccessLevel = await AccessLevel.create(accessLevelObj);
		await newUser.clubAccess.push(createdAccessLevel);
		await newUser.save();
		if (process.env.NODE_ENV !== "test") {
			firebase.updateJWT(uid,{mongoID:newUser._id});
		}
	}
	/**
	 * Single function which handles both sign up and sign in of a user
	 * If the user already exists in the database, it simply fetches the existing doucment
	 * Or else it creates a new document in the users collection, sets the access level object to level1.
	 * Finally uses the Firebase Admin SDK to update the users JWT. Since the user JWT is updated here,
	 * after signing up the client has to refresh the token in order to get the updated token from Firebase.
	 * @param {Object} user user info
	 * @param {String} uid firebase uid
	 * @returns {Object} created user object
	 */
	async authUser(user, uid) {
		console.time("authuser");
		let incomingUser;		
		const exisitingUser=await Users.findOne({firebaseUID:uid}).lean();
		// User document exists(Sign in)
		if(exisitingUser){
			incomingUser=exisitingUser;
		}
		// User document doesnt exist(Sign up)
		else{	
			const newUser = await Users.create({
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
			this.updateUserAfterSignUp(newUser,uid)
			// incomingUser = await Users.findOne({ firebaseUID: uid }).lean()
			incomingUser = newUser
			// console.log(newUser, incomingUser);
		}
		console.timeEnd("authuser");
		return incomingUser;		
	}
	/**
	 * This function updates the current user's document with all the basic info.
	 * It also handles the NITR verification, i.e. the bump from level 1 to level 2.
	 * The client is trusted to call this function with the correct institute ID and
	 * once the institute ID is set for the first time for a user, it cant be updated again.
	 * @param {Object} args updated user info
	 * @param {String} uid firebase uid
	 * @returns {Object} updated user object
	 */
	async updateUser(args,uid) {
		const {user} = args;
		let retPromise = {};
		const foundUser = await Users.findOne({firebaseUID:uid});
		let updatedUser = new Users(foundUser);
		updatedUser = Object.assign(updatedUser, user);
		updatedUser = new Users(updatedUser);
		
		// let regex=/^(1|2|3|4|5|7)[0-9][0-9]((AR|AS|BM|BT|CH|CE|CR|CS|CY|EC|EI|EE|ER|FP|HS|ID|LS|MA|ME|MN|MM|PA|PH|SM)|(ar|as|bm|bt|ch|ce|cr|cs|cy|ec|ei|ee|er|fp|hs|id|ls|ma|me|mn|mm|pa|ph|sm))[0-9]{4}$/;
		if( user.instituteId!==undefined&&foundUser.instituteId===undefined){
			// if(regex.test(user.instituteId)==false){
			// 	return new ApolloError("Invalid Institute ID");
			// }
			// const email=user.instituteId+'@nitrkl.ac.in';
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
	/**
	 * Deletes the Current User from the database and also from the FIrebase
	 * @param {String} uid 
	 * @returns {Object} A success response if the user is deleted successfully.
	 * @throws Will throw an error if the user with the given uid is not found.
	 */
	async deleteUser(uid) {		
		const foundUser = await Users.findOne({ firebaseUID: uid });
		if (foundUser === null) {
			return {...INVALID_INPUT,message:"User Not Found"};
		}
			
		await Users.deleteOne({ _id: foundUser._id })
		await AccessLevel.deleteMany({ user: foundUser._id });
		
		if(process.env.NODE_ENV !== "test") {
			firebase.deleteUser(uid);		
		}
		return { success: true };
	}
}
module.exports = UserAPI;
