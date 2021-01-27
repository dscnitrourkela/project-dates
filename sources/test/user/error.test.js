const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST, INVALID_INPUT_TEST} = require("../testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Errors: Users Queries and Mutations', () => {  

    const { query, mutate } = apolloServer("a8mtrdjiKYtt0PefnS524",["users.asd","users.Delete"]);
  
    it('Get all Users', async () => {    
      const GET_USERS = `
        {
            users{            
                ... on ErrorClass{
                  message,
                  code
                } 
              }   
        }
      `;

      const response = await query({ query: GET_USERS });
      expect(response.data.users).toEqual([PERMISSION_DENIED_TEST]);
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
      expect(response.data.authUser).toEqual(PERMISSION_DENIED_TEST)      
    })

    it("Delete User",async ()=>{
      const DELETE_USER = `
        mutation {
          deleteUser{
            ...on ErrorClass{
              code,
              message
            }
          }
        }
      `;
  
      const response = await mutate({ mutation: DELETE_USER });
      const userResponse= response.data.deleteUser;
      expect(userResponse).toEqual({...INVALID_INPUT_TEST,message:"User Not Found"});
    }) 
  });