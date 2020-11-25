/**
 * Seeding module
 * @module Seed Database
 */

const user = require('./models/user');
const event = require('./models/event');
const accessLevel = require('./models/accessLevel');
const club = require('./models/club');
const venue = require('./models/venue');
const permission = require('./models/permission');
const mongoose = require('mongoose');

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
  },
  {
    name: 'Roshan',
    username: 'Rk shaw',
  },
  {
    name: 'Smarak Das',
    username: 'Smarky',
  },
  {
    name: 'CHinmay Kabi',
    username: 'chinukabi',
  },
  {
    name: 'Abel Mathew',
    username: 'Designer Knight',
  },
];
const clubList = ['DSC', 'GDG', 'MCC', 'RED', 'BLUE'];
const eventList = ['Hactoberfest', 'Hackathon', 'RUNIO', 'Fest', 'Enigma'];
const venueList = ['LA-204', 'RM-Hall', 'BBA', 'LA-lawns', 'Library-Lawns'];
const seedData = async () => {
  await dropIfExists(user);
  await dropIfExists(club);
  await dropIfExists(event);
  await dropIfExists(venue);
  await dropIfExists(accessLevel);

  Promise.all(
    userList.map(async (data, index) => {
      let createdUser = await user.create(data);
      const createdClub = await club.create({
        clubName: clubList[index],
      });
      const accessLevelObj = {
        level: '1',
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
  permission.find({ role: 'ROLE101' }, async (err, found) => {
    if (!found.length) {
      await permission.create({
        role: 'ROLE101',
        permissions: ['clubs.all', 'clubs.byId', 'clubs.byName'],
      });
    }
  });
};
module.exports = {
  seedData,
  seedPermissions,
};
