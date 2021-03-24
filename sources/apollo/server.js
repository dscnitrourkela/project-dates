/**
 * The Apollo Server which powers the backend
 *
 * @format
 * @namespace Apollo
 */

const { ApolloServer, ApolloError } = require('apollo-server');
const UserAPI = require('./users/user.datasources.js');
const ClubAPI = require('./clubs/club.datasources.js');
const EventAPI = require('./events/event.datasources.js');
const VenueAPI = require('./venues/venue.datasources.js');
const AccessLevelAPI = require('./accessLevels/accessLevel.datasources.js');
const StoryAPI = require('./stories/story.datasources.js');
const MessAPI = require('./mess/mess.datasource.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const { firebaseApp } = require('../helpers/firebase');
const { populatePermissions } = require('../helpers/permissions');

//Datasources
const dataSources = () => ({
	UserAPI: new UserAPI(),
	ClubAPI: new ClubAPI(),
	EventAPI: new EventAPI(),
	VenueAPI: new VenueAPI(),
	AccessLevelAPI: new AccessLevelAPI(),
	StoryAPI: new StoryAPI(),
	MessAPI: new MessAPI(),
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
		if (req.headers && req.headers.authorization) {
			const idToken = req.headers.authorization;
			try {
				const decodedToken = await firebaseApp.auth().verifyIdToken(idToken);
				const { uid } = decodedToken;
				if (decodedToken.mongoID) {
					return { uid, permissions: await populatePermissions(decodedToken.mongoID) };
				}
				return { uid, permissions: ['users.Auth'] };
			} catch (error) {
				const errorMessage = error.errorInfo ? error.errorInfo.message : error;
				return {
					error: { message: errorMessage, code: 'UNAUTHORIZED' },
				};
			}
		} else {
			return {
				error: { message: 'JWT not set', code: 'UNAUTHENTICATED' },
			};
		}
	},
	formatError: (err) => new ApolloError(err.message, err.extensions.code),
});

module.exports = server;
