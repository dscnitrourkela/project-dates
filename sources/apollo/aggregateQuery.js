/** @format */


const User = require('./users/user.resolver.js');
const Event = require('./events/event.resolver.js');
const Club = require('./clubs/club.resolver.js');
const Venue = require('./venues/venue.resolver.js');
const AccessLevel = require('./accessLevels/accessLevel.resolver.js');
const Story = require('./stories/story.resolver.js');


const queries = {};

const schemas = [User, Event, Club, Venue,Story];

schemas.forEach((s) => {
	Object.assign(queries, s.queries);
});

module.exports = queries;
