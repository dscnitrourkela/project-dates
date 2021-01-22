/** @format */

const User = require('./user.js');
const Event = require('./event.js');
const Club = require('./club.js');
const Venue = require('./venue.js');
const Story = require('./story.js');
const AccessLevel = require('./accessLevel.js');
const Course = require('./course.js');
const Timetable = require('./timetable.js');


const mutations = {};

const schemas = [User, Event, Club, Venue,Story,AccessLevel, Course, Timetable];

schemas.forEach((s) => {
	Object.assign(mutations, s.mutations);
});

module.exports = mutations;
