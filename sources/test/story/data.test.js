const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");
const {clubSeeder} = require("../../helpers/seed_database");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Stories Queries and Mutations', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["stories.view","superuser.all"]);
  let testStory;
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
    const testClub=await clubSeeder();
    testStory={
      asset:"this is story asset",
      assetType:"dummy text",
      description:"yolooo",
      author:testClub
    };    
    const ADD_STORY = `
        mutation{
          addStory(story:{    
            author:"`+testStory.author.id+`",
            asset:"`+testStory.asset+`",
            description:"`+testStory.description+`",
            assetType:"`+testStory.assetType+`"
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
    testStory.id=storyResponse.id;
    expect(JSON.stringify(storyResponse)).toEqual(JSON.stringify(testStory));
  });

  it('Check added story is being fetched', async () => {    
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
      authorId:testStory.author.id,
      authorName:testStory.author.clubName,
      authorLogo:testStory.author.theme,      
      story:[{
        id: testStory.id
      }]
    }
    expect(JSON.stringify(response.data.currentStories)).toEqual(JSON.stringify([testCurrentStory]));
  });

});