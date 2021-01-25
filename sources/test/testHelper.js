const { createTestClient } = require('apollo-server-testing');
const server = require('../server');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
let {PERMISSION_DENIED} = require("../errors/index");

PERMISSION_DENIED_TEST={...PERMISSION_DENIED}
delete PERMISSION_DENIED_TEST.__typename;

// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;

const beforeTests= async () => {
    const opts = { useNewUrlParser: true ,useUnifiedTopology: true ,useCreateIndex : true}; 
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri, opts);
  }

const afterTests= async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}

const apolloServer = (uid,permissions)=>{
    server.context = ()=> ({
        uid:uid,
        permissions:permissions
    }) 
    return createTestClient(server);
}

const unquoteUtil= (obj)=> obj.replace(/"([^"]+)":/g, '$1:')

module.exports={
    beforeTests,
    afterTests,
    apolloServer,
    PERMISSION_DENIED_TEST,
    unquoteUtil
}