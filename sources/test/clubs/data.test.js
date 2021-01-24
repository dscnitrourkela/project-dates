const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Stories Queries and Mutations', () => {  
    const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["clubs.add"]);
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