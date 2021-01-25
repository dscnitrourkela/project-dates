const {beforeTests,afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Users Queries and Mutations', () => {  

  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["users.all","users.Auth","users.byName","users.byId","users.Update","users.Delete"]);
  let testUser={
    name:"Harish",
    username:"HarishTeens"  
  };
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

  it("Authenticate User(Sign up)",async ()=>{
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

  it("Authenticate User(Sign in) + Level 1 check",async ()=>{
    const testUser4={
      ...testUser,
      clubAccess:[{
        level:"1",
        name:testUser.name
      }]
    }
    const AUTH_USER = `
      mutation {
        authUser{
          ... on User{
            name
            id,
            username,
            clubAccess{
              level,
              name
            }
          }
        }
      }
    `;

    const response = await mutate({ mutation: AUTH_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.authUser;
    expect(userResponse).toEqual(testUser4);
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
        mobile:"12345678",
        emergencyContact:"1223456789",
        address: "hello this is my address",
        displayPicture: "yoloasdfadsf",
        gmailAuthMail:"sdfgyuik,sadf"
    }
    const UPDATE_USER = `
      mutation {
        updateUser(user:{
          mobile: "`+testUser2.mobile+`",
          emergencyContact: "`+testUser2.emergencyContact+`",
          address: "`+testUser2.address+`",
          displayPicture: "`+testUser2.displayPicture+`",
          gmailAuthMail: "`+testUser2.gmailAuthMail+`"
        }){
          ... on User{
            mobile,
            emergencyContact,
            address,
            displayPicture,
            gmailAuthMail
          }
        }
      }
    `;

    const response = await mutate({ mutation: UPDATE_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.updateUser;
    expect(userResponse).toEqual(testUser2);
  })

  it("Update User's Insti ID",async ()=>{
    const testUser3={
        instituteId: "117CS0176"
    }
    const UPDATE_USER = `
      mutation {
        updateUser(user:{
          instituteId: "`+testUser3.instituteId+`"          
        }){
          ... on User{
            instituteId
          }
        }
      }
    `;

    const response = await mutate({ mutation: UPDATE_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.updateUser;
    expect(userResponse).toEqual(testUser3);
  })

  it("Delete User",async ()=>{
    const DELETE_USER = `
      mutation {
        deleteUser{
          ... on Response{
            success
          }
          ...on ErrorClass{
            code,
            message
          }
        }
      }
    `;

    const response = await mutate({ mutation: DELETE_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.deleteUser;
    expect(userResponse.success).toEqual(true);
  })
  
  
});