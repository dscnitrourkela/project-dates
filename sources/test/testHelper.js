const { createTestClient } = require('apollo-server-testing');
const server = require('../server');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

const beforeTests= async () => {
    const opts = { useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex : true}; 
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts, (err) => {
      if (err) console.error(err);
    });
  }

const afterTests= async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}

const apolloServer = (uid,permissions)=>{
    server.context = ()=> ({
        uid:uid,
        permissions:["users.all","users.Auth"]
    }) 
    return createTestClient(server);
}

module.exports={
    beforeTests,
    afterTests,
    apolloServer
}