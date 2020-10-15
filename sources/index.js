const {ApolloServer,gql, ApolloError} = require('apollo-server');
const UserAPI = require('./datasources/users.js');
const ClubAPI = require('./datasources/clubs.js');
const EventAPI = require('./datasources/events.js');
const VenueAPI = require('./datasources/venues.js');
const AccessLevelAPI = require('./datasources/accessLevels.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
// require('./seed_database.js');

mongoose.connect(process.env.MONGODB_URL||"mongodb://localhost/elaichi",{ useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.connection.once('open',()=>{
    console.log('connected to the database');
});


const dataSources =() => ({
    UserAPI: new UserAPI(),
    ClubAPI: new ClubAPI(),
    EventAPI: new EventAPI(),
    VenueAPI: new VenueAPI(),
    AccessLevelAPI: new AccessLevelAPI(),
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection:true,
    playground:true,
    debug:false,
    // formatError:(err)=>{
    //     if(err.extensions.code=="INTERNAL_SERVER_ERROR"){
    //         return new ApolloError("We are having some trouble","ERROR",{Token:"Unique Token"});
    //     }
    //     return err;
    // }
});

server
    .listen(5000)
    .then(({url})=>{
        console.log(`Graphql v2 running on ${url}`,'New log');
    });
