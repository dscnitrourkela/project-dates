/** @format */

const { ApolloServer, gql, ApolloError } = require('apollo-server');
const UserAPI = require('./datasources/users.js');
const ClubAPI = require('./datasources/clubs.js');
const EventAPI = require('./datasources/events.js');
const VenueAPI = require('./datasources/venues.js');
const AccessLevelAPI = require('./datasources/accessLevels.js');
const StoryAPI = require('./datasources/stories.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seed = require('./helpers/seed_database');
const {firebaseApp}=require("./helpers/firebase")
const cloudinary = require('cloudinary').v2;
const {populatePermissions } = require("./helpers/permissions");

dotenv.config();

//Mongoose Configs
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/elaichi', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
	console.log('connected to the database');
	// seed.seedData();
	// seed.seedPermissions();
});

//Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

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
	 */
	context: async ({ req }) => {
		const obj = gql`
		    ${req.body.query}
		`;
		if(req.headers && req.headers.authorization){
		    const idToken=req.headers.authorization;
		    try {
				const decodedToken= await firebaseAPP.auth().verifyIdToken(idToken)
				const uid= decodedToken.uid;	
				if(decodedToken.mongoID){
					return {uid:uid, permissions: await populatePermissions(decodedToken.mongoID)};
				}else{
					return {uid:uid, permissions: ["users.Auth"]};
				}
				
		    } catch (error) {
				console.log(error);
		        throw new Error(error.errorInfo.message);
		    }
		}
	},			
	formatError: (err) =>
		// if(err.extensions.code=="INTERNAL_SERVER_ERROR"){
		//     return new ApolloError("We are having some trouble","ERROR",{Token:"Unique Token"});
		// }
		// console.log(err.originalError);
		new ApolloError(err.message),
});

server.listen(5000).then(({ url }) => {
	console.log(`Graphql running on ${url}`);
});
