const { ApolloServer, gql, ApolloError, AuthenticationError } = require('apollo-server');
const UserAPI = require('./datasources/users.js');
const ClubAPI = require('./datasources/clubs.js');
const EventAPI = require('./datasources/events.js');
const VenueAPI = require('./datasources/venues.js');
const AccessLevelAPI = require('./datasources/accessLevels.js');
const StoryAPI = require('./datasources/stories.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const {firebaseApp}=require("./helpers/firebase");
const {populatePermissions } = require("./helpers/permissions");

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
		if(req.headers && req.headers.authorization){
		    const idToken=req.headers.authorization;
		    try {
				const decodedToken= await firebaseApp.auth().verifyIdToken(idToken)
				const uid= decodedToken.uid;	
				if(decodedToken.mongoID){
					return {uid:uid, permissions: await populatePermissions(decodedToken.mongoID)};
				}else{
					return {uid:uid, permissions: ["users.Auth"]};
				}
				
		    } catch (error) {
		        throw new ApolloError(error.errorInfo.message,"UNAUTHORIZED");
		    }
		}else{
			throw new ApolloError("JWT not set","UNAUTHENTICATED");
		}
	},
	formatError: (err) => new ApolloError(err.message,err.extensions.code)
});

module.exports = server;