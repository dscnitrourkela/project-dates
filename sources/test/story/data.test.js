const {beforeTests,afterTests, unquoteUtil, apolloServer,ObjectIdGenerator} = require("../testHelper");
const {clubSeeder,eventSeeder,storySeeder} = require("../../helpers/seed_database");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Stories Queries and Mutations', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);
  const testObj={
    asset:"this is story asset",
    assetType:"dummy text",
    description:"yolooo"
  };
  it('Add Story', async () => { 
    const testStory=JSON.stringify({
      ...testObj,
      author: (await clubSeeder()).id
    });
    const inputTestStory=unquoteUtil(testStory);    
    const ADD_STORY = `
        mutation{
          addStory(story:`+inputTestStory+`){
            ... on Story{
              asset,
              assetType,
              description,
              author{
                id
              },
              id
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });   
    const storyResponse=response.data.addStory;
    expect(storyResponse.id).toEqual(expect.any(String))
    delete(storyResponse.id);
    storyResponse.author=storyResponse.author.id
    expect(JSON.stringify(storyResponse)).toEqual(testStory);
  });  
  
  it('Add Story linked to an event',async () => {
    const testStory=JSON.stringify({
      ...testObj,
      author: (await clubSeeder()).id,
      event:(await eventSeeder()).id
    });
    const inputTestStory=unquoteUtil(testStory);        
    const ADD_STORY = `
          mutation{
            addStory(story:`+inputTestStory+`){
            ... on Story{
              asset,
              assetType,
              description,
              author{
                id
              }
              event{
                id
              }
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });          
    const storyResponse=response.data.addStory;
    storyResponse.author=storyResponse.author.id;
    storyResponse.event=storyResponse.event.id
    expect(JSON.stringify(storyResponse)).toEqual(testStory);
  })

  it('Check added stories are being fetched', async () => {    
    const club=await clubSeeder(); 
    const id1=await storySeeder(club.id); // story 1 
    const id2=await storySeeder(club.id);// story 2
    const storyIds=[id1,id2];
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
    const storyResponse=response.data.currentStories;
    // eslint-disable-next-line eqeqeq
    const testStoryResponse=storyResponse.filter(e => e.authorId==club.id);
    const testCurrentStory=[{
      authorId:club.id,
      authorName:club.clubName,
      authorLogo:club.theme,      
      story:storyIds
    }]
    expect(JSON.stringify(testStoryResponse)).toEqual(JSON.stringify(testCurrentStory));
  });

  it('Delete Story',async () => {
    const club=await clubSeeder(); 
    const story=await storySeeder(club.id); // story 1 
    const DELETE_STORY = `
      {
        deleteStory(
          id:"`+story.id+`",
          author:"`+club.id+`"
        ){
          ... on Response{
            success
          }
        }
  
      }
    `;

    const response = await query({ query: DELETE_STORY });  
    expect(response.data.deleteStory.success).toEqual(true);
  })

});

describe('Results: Stories Invalid Input', () => {
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);
  it('Add Story Story Author Not Given', async () => { 
    const ADD_STORY = `
        mutation{
          addStory{
            ... on ErrorClass{
                message,
                code
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });  
    expect(response.data.addStory).toEqual({...INVALID_INPUT_TEST, message:"Input Story must have author"});
  }); 

  it('Add Story Story Author Not Found', async () => {     
    const ADD_STORY = `
        mutation{
          addStory(story:{
              author:"`+ObjectIdGenerator()+`"
            }){
            ... on ErrorClass{
                message,
                code
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });    
    expect(response.data.addStory).toEqual({...INVALID_INPUT_TEST, message:"Author Not Found"});
  }); 

  it('Add Story linked to an event Invalid',async () => {
    const testClub=await clubSeeder();
    const ADD_STORY = `
        mutation{
          addStory(story:{    
            author:"`+testClub.id+`",
            event:"vdersewwawa"
          }){
            ... on ErrorClass{
              code,
              message
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });    
    expect(response.data.addStory).toEqual({...INVALID_INPUT_TEST, message:"Invalide Event ID"});
  })

  it('Add Story linked to an event Not Found',async () => {
    const testClub=await clubSeeder();
    const ADD_STORY = `
        mutation{
          addStory(story:{    
            author:"`+testClub.id+`",
            event:"`+ObjectIdGenerator()+`"
          }){
            ... on ErrorClass{
              code,
              message
            }
          }
        }
    `;
    const response = await mutate({ mutation: ADD_STORY });    
    expect(response.data.addStory).toEqual({...INVALID_INPUT_TEST, message:"Event Not Found"});
  })
  it('Delete Story',async () => {
    const club=await clubSeeder(); 
    const story=await storySeeder(club.id); // story 1 
    const DELETE_STORY = `
      {
        deleteStory(
          id:"`+story.id+`",
          author:"`+club.id+`"
        ){
          ... on Response{
            success
          }
        }
  
      }
    `;

    const response = await query({ query: DELETE_STORY });  
    expect(response.data.deleteStory.success).toEqual(true);
  })
  it('Delete Story when story Not Found',async () => {
    const club=await clubSeeder();
    const storyId=ObjectIdGenerator();
    const DELETE_STORY = `
      {
        deleteStory(
          id:"`+storyId+`",
          author:"`+club.id+`"
        ){
          ... on ErrorClass{
            code,
            message
          }
        }
  
      }
    `;
    const response = await mutate({ mutation: DELETE_STORY });  
    expect(response.data.deleteStory).toEqual({...INVALID_INPUT_TEST, message:"Story Not Found"});
  })
})
