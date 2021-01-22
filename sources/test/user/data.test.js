const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Users Queries and Mutations', () => {  

  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["users.all","users.Auth"]);

  it('Get all Users', async () => {    
      const GET_USERS = `
        {
          users{
            ... on User{
              name
            }
          }
    
        }
      `;

      const response = await query({ query: GET_USERS });
      expect(response.data.users).toEqual([]);
    });

  it("Authenticate User",async ()=>{
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
          ... on ErrorClass{
            code,
            message
          }
        }
      }
    `;

    const response = await mutate({ mutation: AUTH_USER });
    expect(response.errors).toEqual(undefined)
    expect(response.data.authUser).toEqual({"name": "Harish"});
  })

  it('user by username', async () => {    
    const GET_USERS = `
      {
        userByUsername(username:"Harish"){            
          ... on ErrorClass{
            code,
            message
          }
        } 
      }
    `;

    const response = await query({ query: GET_USERS });
    expect(response.data.userByUsername).toEqual(PERMISSION_DENIED_TEST);
  });  
});