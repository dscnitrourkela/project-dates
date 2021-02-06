/**
 * The Apollo Server which powers the backend
 * @namespace Apollo
 */
const { ApolloServer, ApolloError} = require('apollo-server');
const UserAPI = require('./users/user.datasources.js');
const ClubAPI = require('./clubs/club.datasources.js');
const EventAPI = require('./events/event.datasources.js');
const VenueAPI = require('./venues/venue.datasources.js');
const AccessLevelAPI = require('./accessLevels/accessLevel.datasources.js');
const StoryAPI = require('./stories/story.datasources.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const {firebaseApp}=require("../helpers/firebase");
const {populatePermissions } = require("../helpers/permissions");


//Datasources
const dataSources = () => ({
	UserAPI: new UserAPI(),
	ClubAPI: new ClubAPI(),
	EventAPI: new EventAPI(),
	VenueAPI: new VenueAPI(),
	AccessLevelAPI: new AccessLevelAPI(),
	StoryAPI:new StoryAPI()
});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources,
	introspection: true,
	resolverValidationOptions: { requireResolversForResolveType: false },
	playground: true,
	debug: false,
	/**
	 * GraphQL Context:  A top level function which decodes and verifies the JWT sent through the request header
	 *  @param {string} decodedToken - JWT token from request
	 * If the user is just signin up, they would be given permissions only to access the Auth Mutation
	 */
	context: async ({ req }) => {
		return {uid:"adsf",permissions:["superuser.all"]}
	},
	formatError: err => new ApolloError(err.message,err.extensions.code)
});

module.exports = server;
