const {beforeTests,unquoteUtil, afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");
const {clubSeeder,eventSeeder,memberSeeder} = require("../../helpers/seed_database");
// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Clubs Queries and Mutations', () => {  
    const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);    
    const testObj={
      clubName:"DSC",
      description: "developer student clubs",
      facAd: "some dude",
      theme:[
        {name:"dark",logo:"dark-logo",backgroundColor:"yellow"},
        {name:"light",logo:"light-logo",backgroundColor:"drakgreen"}
      ],
      society:"tech",
      domain: "this is the domain yo",
      links: [
        {name:"insta",link:"instagram.com/dsnitroukela"}
      ],
      contactInfo: [
        {name:"Harish",designation:"DSC Lead",mobileNo:"1234567890",email:"a@a.com"},
        {name:"Chinmoi",designation:"Meme coach",mobileNo:"1234567890",email:"a@a.com"}
      ]
    };
    it('Create Club', async () => {                           
      const testClub=JSON.stringify(testObj)
      const inputTestClub=unquoteUtil(testClub);
      const CREATE_CLUB = `
        mutation{
          addClub(club:`+inputTestClub+`){
            ... on Club{
              clubName,
              description,
              facAd,
              theme{
                name,
                logo,
                backgroundColor
              }
              society,
              domain,
              links{
                name,
                link
              },
              contactInfo{
                name,
                designation,
                mobileNo,
                email
              },
              id
            }
          }
        }
      `;
      const response = await mutate({ mutation: CREATE_CLUB });
      const clubResponse=response.data.addClub;
      expect(clubResponse.id).toEqual(expect.any(String))
      delete(clubResponse.id);
      expect(JSON.stringify(clubResponse)).toEqual(testClub); 
    });

    it('Update Club with other info', async () => {    
      const clubId=(await clubSeeder()).id;           
      const testClub=JSON.stringify(testObj)
      const inputTestClub=unquoteUtil(testClub);
      const UPDATE_CLUB = `
        mutation{
          updateClub(id:"`+clubId+`",club:`+inputTestClub+`){
            ... on Club{
              clubName
              description,
              facAd,
              theme{
                name,
                logo,
                backgroundColor
              }
              society,
              domain,
              links{
                name,
                link
              },
              contactInfo{
                name,
                designation,
                mobileNo,
                email
              }
            }
          }
        }
      `;

      const response = await mutate({ mutation: UPDATE_CLUB });
      const clubResponse=response.data.updateClub;
      expect(JSON.stringify(clubResponse)).toEqual(testClub); 
    });

    
    it('Update Club with events',async () => {
      const clubId=(await clubSeeder()).id;  
      const event=await eventSeeder();
      const testClub=JSON.stringify({
        events:[event.id]
      })
      const inputTestClub=unquoteUtil(testClub); 
      const UPDATE_CLUB = `
        mutation{
          updateClub(id:"`+clubId+`",club:`+inputTestClub+`){
            ... on Club{
              events{
                id,
                eventName
              }
            }
          }
        }
      `;
      const response = await mutate({ mutation: UPDATE_CLUB });
      const clubResponse=response.data.updateClub;   
      const transformedClub=JSON.stringify({
        events:[event]
      })   
      expect(JSON.stringify(clubResponse)).toEqual(transformedClub); 
    })

    it('Delete club', async () => {     
      const clubId = (await clubSeeder()).id;    
      await memberSeeder(clubId)
      const DELETE_CLUB = `
        mutation{
          deleteClub(id:"`+clubId+`"){
            ... on Response{
              success
            }
          }
        }
      `;

      const response = await mutate({ mutation: DELETE_CLUB });      
      console.log(JSON.stringify(response, null, 4));
      expect(response.data.deleteClub.success).toEqual(true); 
    });

    // it('Update Club with members',async () => {
    //   const members=[];
    //   const testClub3=JSON.stringify({
    //     memberAccess:members
    //   })
    //   const inputTestClub3=unquoteUtil(testClub3); 
    //   const UPDATE_CLUB = `
    //     mutation{
    //       updateClub(id:"`+testClub.id+`",club:`+inputTestClub3+`){
    //         ... on Club{
    //           memberAccess{
    //             id
    //             level
    //             name
    //             relation
    //             club{
    //               id
    //             }
    //             user{
    //               id
    //             }
    //           }
    //         }
    //       }
    //     }
    //   `;
    //   const response = await mutate({ mutation: UPDATE_CLUB });
    //   console.log(JSON.stringify(response,null,4));
    //   const clubResponse=response.data.updateClub;   
    //   const transformedClub=JSON.stringify({
    //     events:[{id:event1.id}]
    //   })   
    //   expect(JSON.stringify(clubResponse)).toEqual(transformedClub); 
    // })
})

describe('Errors: Clubs Invalid Input', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);       

  it('Update Club', async () => {               
    const UPDATE_CLUB = `
      mutation{
        updateClub(id:"12345678",club:{
            clubName:"asdf"
        }){
          ... on ErrorClass{
              message,
              code
          }
        }
      }
    `;

    const response = await mutate({ mutation: UPDATE_CLUB });
    expect(response.data.updateClub.code).toEqual(INVALID_INPUT_TEST.code); 
  });

  it('Delete club', async () => {               
    const DELETE_CLUB = `
      mutation{
        deleteClub(id:"2345677"){
          ... on ErrorClass{
              message,
              code
          }
        }
      }
    `;

    const response = await mutate({ mutation: DELETE_CLUB });      
    expect(response.data.deleteClub.code).toEqual(INVALID_INPUT_TEST.code); 
  });
})

describe('Errors: Clubs Not Found', () => {  
  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);       

  it('Update Club', async () => {               
    const UPDATE_CLUB = `
      mutation{
        updateClub(id:"600fb30e0bf60939044b3eb8",club:{
            clubName:"asdf"
        }){
          ... on ErrorClass{
              message,
              code
          }
        }
      }
    `;

    const response = await mutate({ mutation: UPDATE_CLUB });
    expect(response.data.updateClub.code).toEqual(INVALID_INPUT_TEST.code); 
  });

  it('Delete club', async () => {               
    const DELETE_CLUB = `
      mutation{
        deleteClub(id:"600fb30e0bf60939044b3eb8"){
          ... on ErrorClass{
              message,
              code
          }
        }
      }
    `;

    const response = await mutate({ mutation: DELETE_CLUB });      
    expect(response.data.deleteClub.code).toEqual(INVALID_INPUT_TEST.code); 
  });
})