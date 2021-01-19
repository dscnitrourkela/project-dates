// testing library
const { createTestClient } = require('apollo-server-testing');
const server = require('./server');
const MongoClient = require('mongodb').MongoClient;
const dotenv = require('dotenv');
dotenv.config();
jest.setTimeout(30000);

describe('mongo tests', () => {
  
  let mongoConnection;
  beforeAll(async ()=>{
      console.log(process.env.MONGODB_URL);
    mongoConnection = MongoClient.connect(process.env.MONGODB_URL, { useUnifiedTopology: true });
  })
  
  afterAll(() => {
    // to make sure the tests are not hanging around
    // we expose the mongo connection from our code, and close it after all test finished
    return mongoConnection.then((mongo) => mongo.close());
  });

  test('read / write from mocked mongo', async () => {
    server.context = ()=> ({
        uid:"adsfasdf",
        permissions:["users.all"]
    })
    const { query, mutate } = createTestClient(server);

    // graphl query
    const GET_BOOKS = `
    {
      users {
        ... on User{
            name
        }
      }
    }
    `;

    // initially empty
    let response = await query({ query: GET_BOOKS });
    console.log(response);
    expect(response.data.users).toEqual([]);
  });
});