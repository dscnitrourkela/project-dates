const {beforeTests,afterTests, apolloServer} = require("./testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Users Queries and Mutations', () => {  

  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["users.all","users.Auth"]);

  it('Get all Users', async () => {    
      const GET_USERS = `
        {
          users(name:"Harish") {
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
          }
        }
      `;

      const response = await mutate({ mutation: AUTH_USER });
      expect(response.errors).toEqual(undefined)
      expect(response.data.authUser).toEqual({"name": "Harish"});
    })
});

describe('Errors: Users Queries and Mutations', () => {  

  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",[""]);

  it('Get all Users', async () => {    
      const GET_USERS = `
        {
          users(name:"Harish") {            
            ... on ErrorClass{
              message,
              code
            }
          }    
        }
      `;

      const response = await query({ query: GET_USERS });
      console.log(JSON.stringify(response, null, 4));
      expect(response.data.errors).toEqual([{}]);
    });

    it("Authenticate User",async ()=>{
      const AUTH_USER = `
        mutation {
          authUser(user:{
            username:"HarishTeens",
              gmailAuthMail:"arishh2@gmail.com",
            name:"Harish"
          }){
            ... on ErrorClass{
              message,
              code
            }
          }
        }
      `;

      const response = await mutate({ mutation: AUTH_USER });
      console.log(JSON.stringify(response, null, 4));
      expect(response.errors).toEqual(undefined)      
    })
});