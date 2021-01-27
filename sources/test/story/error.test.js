const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");
const {clubSeeder,eventSeeder} = require("../../helpers/seed_database");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Errors: Stories Permission Denied', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["test.test"]);
  it('Current Stories', async () => {    
      const FETCH_STORIES = `
        {
          currentStories{
            ... on ErrorClass{
                message,
                code
            }
          }    
        }
      `;

      const response = await query({ query: FETCH_STORIES });
      expect(response.data.currentStories).toEqual([PERMISSION_DENIED_TEST]);
    })

  it('Add Story', async () => { 
    const ADD_STORY = `
        mutation{
          addStory(story:{
            author:"asdf"
          }){
            ... on ErrorClass{
                message,
                code
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });  
    expect(response.data.addStory).toEqual(PERMISSION_DENIED_TEST);
  });    

  it('Delete Story',async () => {
    const DELETE_STORY = `
      {
        deleteStory(
          id:"asdfewr",
          author:"asdwerew"
        ){
          ... on ErrorClass{
            code,
            message
          }
        }
  
      }
    `;

    const response = await query({ query: DELETE_STORY }); 
    expect(response.data.deleteStory).toEqual(PERMISSION_DENIED_TEST);
  })  
});