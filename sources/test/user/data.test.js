const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Users Queries and Mutations', () => {  

  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["users.all","users.Auth","users.byName","users.byId","users.Update"]);
  let testUser={
    name:"Harish",
    username:"HarishTeens"  
  },testUser2;
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
          username:"`+testUser.username+`",
          gmailAuthMail:"arishh2@gmail.com",
          name:"`+testUser.name+`"
        }){
          ... on User{
            name
            id,
            username
          }
        }
      }
    `;

    const response = await mutate({ mutation: AUTH_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.authUser;
    testUser.id=userResponse.id;
    expect(userResponse).toEqual(testUser);
  })

  it('user by username', async () => {    
    const GET_USER = `
      {
        userByUsername(username:"`+testUser.username+`"){            
          ... on User{
            name
            id,
            username
          }
        } 
      }
    `;

    const response = await query({ query: GET_USER });
    expect(response.data.userByUsername).toEqual(testUser);
  }); 
  
  it('user by id', async () => {    
    const GET_USER = `
      {
        userById(id:"`+testUser.id+`"){            
          ... on User{
            name
            id,
            username
          }
        } 
      }
    `;      
    const response = await query({ query: GET_USER });
    expect(response.data.userById).toEqual(testUser);
  });   

  it("Update User",async ()=>{
    const testUser2={
        ...testUser,
        mobile:"12345678",
        emergencyContact:"1223456789"
    }
    const UPDATE_USER = `
      mutation {
        updateUser(user:{
          mobile: "`+testUser2.mobile+`",
          emergencyContact: "`+testUser2.emergencyContact+`"
        }){
          ... on User{
            name
            id,
            username,
            mobile,
            emergencyContact
          }
        }
      }
    `;

    const response = await mutate({ mutation: UPDATE_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.updateUser;
    expect(userResponse).toEqual(testUser2);
  })
  
});