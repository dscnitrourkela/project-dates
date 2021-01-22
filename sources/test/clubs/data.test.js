const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");
const {testSeeder} = require("../../helpers/seed_database");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Stories Queries and Mutations', () => {  

    it('Create Club', async () => {               
      const ADD_STORY = `
        mutation{
          addClub(club:{
            clubName:"DSC"
          }){
            ... on Club{
              id
            }
          }
        }
      `;

      const response = await mutate({ mutation: ADD_STORY });
      clubId=response.data.addClub.id;
      expect(clubId).toEqual(expect.any(String)); 
    });
})