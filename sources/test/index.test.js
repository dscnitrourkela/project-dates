// testing library
const { createTestClient } = require('apollo-server-testing');
const server = require('../server');
// jest.setTimeout(30000);

const mongoose = require("mongoose");
const { MongoMemoryServer } = require('mongodb-memory-server');


// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

let mongoServer;
const opts = { useMongoClient: true }; // remove this option if you use mongoose 5 and above

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err);
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('...', () => {
    it('read / write from mocked mongo', async () => {
        server.context = ()=> ({
            uid:"adsfas1234df",
            permissions:["users.all","users.Auth"]
        })
        const { query, mutate } = createTestClient(server);
    
        // graphl query
        const GET_BOOKS = `
        {
          users(name:"Harish") {
            ... on User{
                name
            }
            ... on ErrorClass{
              message
            }
          }
    
        }
        `;

        const AUTH_USER = `
          mutation {
            authUser(user:{
              username:"HarishTeens",
               gmailAuthMail:"arishh2@gmail.com",
              name:"Harish"
            }){
              ... on User{
                name
              }
            }
          }
        `
          
        let response = await mutate({ mutation: AUTH_USER });
        console.log(response);
        // initially empty
        response = await query({ query: GET_BOOKS });
        expect(response.data.users).toEqual([]);
      });
});