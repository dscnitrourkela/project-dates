const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");
const {testSeeder} = require("../../helpers/seed_database");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Stories Queries and Mutations', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["stories.view","superuser.all"]);
  let clubId;
  it('Fetch all current stories', async () => {    
      const FETCH_STORIES = `
        {
          currentStories{
            ... on CurrentStory{
              id
            }
          }
    
        }
      `;

      const response = await query({ query: FETCH_STORIES });
      expect(response.data.currentStories).toEqual([]);
    });

    it('Add Story', async () => { 
      const clubId = await testSeeder();
      const ADD_STORY = `
          mutation{
            addStory(story:{    
              asset:"Abel bhaiyaa",
              assetType:"You cant top this my mahn"
              author:"`+clubId+`"
            }){
              ... on  ErrorClass{
                message,
                code
              }
              ... on Story{
                id
              }
            }
          }
      `;

      const response = await mutate({ mutation: ADD_STORY });
      const storyId=response.data.addStory.id;
      expect(storyId).toEqual(expect.any(String));
    });

});