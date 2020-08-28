const {ApolloServer,gql, ApolloError} = require('apollo-server');
const UserAPI = require('./datasources/users.js');
const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/elaichi",{ useNewUrlParser: true ,useUnifiedTopology: true });
mongoose.connection.once('open',()=>{
    console.log('connected to the database');
});


const dataSources =() => ({
    UserAPI: new UserAPI(),
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    introspection:true,
    playground:true,
    debug:false,
    formatError:(err)=>{
        if(err.extensions.code=="INTERNAL_SERVER_ERROR"){
            return new ApolloError("We are having some trouble","ERROR",{Token:"Unique Token"});
        }
        return err;
    }
});

server
    .listen({port: process.env.PORT || 4000})
    .then(({url})=>{
        console.log(`Graphql running on ${url}`);
    });