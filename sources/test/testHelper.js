const { createTestClient } = require('apollo-server-testing');
const server = require('../server');
const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');
let {PERMISSION_DENIED,INVALID_INPUT} = require("../errors/index");

PERMISSION_DENIED_TEST={...PERMISSION_DENIED}
delete PERMISSION_DENIED_TEST.__typename;
INVALID_INPUT_TEST={...INVALID_INPUT}
delete INVALID_INPUT_TEST.__typename;

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

const ObjectIdGenerator = (m = Math, d = Date, h = 16, s = s => m.floor(s).toString(h)) =>
    s(d.now() / 1000) + ' '.repeat(h).replace(/./g, () => s(m.random() * h))

const unquoteUtil= (obj)=> obj.replace(/"([^"]+)":/g, '$1:')

module.exports={
    beforeTests,
    afterTests,
    apolloServer,
    PERMISSION_DENIED_TEST,
    INVALID_INPUT_TEST,
    unquoteUtil,
    ObjectIdGenerator
}