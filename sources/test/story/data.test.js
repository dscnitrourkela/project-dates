const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");
const {clubSeeder,eventSeeder} = require("../../helpers/seed_database");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Stories Queries and Mutations', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["stories.view","superuser.all"]);
  let testStory1,testStory2,testClub;
  it('Current Stories initally empty', async () => {    
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
    })

  it('Add Story', async () => { 
    testClub=await clubSeeder();
    testStory1={
      asset:"this is story asset",
      assetType:"dummy text",
      description:"yolooo",
      author:testClub
    };    
    const ADD_STORY = `
        mutation{
          addStory(story:{    
            author:"`+testStory1.author.id+`",
            asset:"`+testStory1.asset+`",
            description:"`+testStory1.description+`",
            assetType:"`+testStory1.assetType+`"
          }){
            ... on Story{
              asset,
              assetType,
              description,
              author{
                id,
                clubName,
                theme{
                  name,
                  logo
                }
              },
              id
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });   
    const storyResponse=response.data.addStory;
    testStory1.id=storyResponse.id;
    expect(JSON.stringify(storyResponse)).toEqual(JSON.stringify(testStory1));
  });  
  
  it('Story linked to an event',async () => {
    testStory2={
      author:{
        id:testClub.id
      },
      event:await eventSeeder()
    };    
    const ADD_STORY = `
        mutation{
          addStory(story:{    
            author:"`+testStory2.author.id+`",
            event:"`+testStory2.event.id+`"
          }){
            ... on Story{
              author{
                id
              }
              event{
                id,
                eventName
              }
              id
            }
            ... on ErrorClass{
              code,
              message
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });            
    const storyResponse=response.data.addStory;
    testStory2.id=storyResponse.id;
    expect(JSON.stringify(storyResponse)).toEqual(JSON.stringify(testStory2));
  })

  it('Check added stories are being fetched', async () => {    
    const FETCH_STORIES = `
      {
        currentStories{
          ... on CurrentStory{
            authorId,
            authorName,
            authorLogo{
              name,
              logo
            }
            story{
              id
            }
          }
        }
  
      }
    `;

    const response = await query({ query: FETCH_STORIES });
    const testCurrentStory={
      authorId:testStory1.author.id,
      authorName:testStory1.author.clubName,
      authorLogo:testStory1.author.theme,      
      story:[{id: testStory1.id},{id: testStory2.id}]
    }
    expect(JSON.stringify(response.data.currentStories)).toEqual(JSON.stringify([testCurrentStory]));
  });

  it('Delete Story',async () => {
    const DELETE_STORY = `
      {
        deleteStory(
          id:"`+testStory1.id+`",
          author:"`+testStory1.author.id+`"
        ){
          ... on Response{
            success
          }
          ... on ErrorClass{
            code,
            message
          }
        }
  
      }
    `;

    const response = await query({ query: DELETE_STORY }); 
    expect(response.data.deleteStory.success).toEqual(true);
  })

  
});