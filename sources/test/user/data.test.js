const {beforeTests,afterTests, apolloServer, unquoteUtil, PERMISSION_DENIED_TEST} = require("../testHelper");
const {UserSeeder} =require("../../helpers/seed_database");
// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Users Queries and Mutations', () => {  

  const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);
  let testObj={
    name:"Harish",
    username:"HarishTeens",
    gmailAuthMail: "a@a.com"
  };
  it('Get all Users', async () => {    
    const testUser=await UserSeeder("coolnick3"); 
    const GET_USERS = `
      {
        users{
          ... on User{
            username
          }
        }
  
      }
    `;

    const response = await query({ query: GET_USERS });
    expect(response.data.users).toEqual([{username:"coolnick3"}]);
  });
  
  it('user by username', async () => {    
    const testUser=await UserSeeder("coolnick");
    const GET_USER = `
      {
        userByUsername(username:"`+testUser.username+`"){            
          ... on User{
            username
          }
        } 
      }
    `;

    const response = await query({ query: GET_USER });
    expect(response.data.userByUsername.username).toEqual("coolnick");
  }); 
  
  it('user by id', async () => {  
    const testUser=await UserSeeder("coolnick2");  
    const GET_USER = `
      {
        userById(id:"`+testUser._id+`"){            
          ... on User{
            id,
            username
          }
        } 
      }
    `;      
    const response = await query({ query: GET_USER });
    expect(JSON.stringify(response.data.userById.id)).toEqual(JSON.stringify(testUser._id));
  }); 
  
  it("Authenticate User(Sign up+Sign In)",async ()=>{
    //SIGN Up
    const testUser=JSON.stringify(testObj);
    const inputTestUser=unquoteUtil(testUser);
    const SIGNUP_USER = `
      mutation {
        authUser(user:`+inputTestUser+`){
          ... on User{
            name
            username,
            gmailAuthMail,
            id,
          }
        }
      }
    `;

    const response = await mutate({ mutation: SIGNUP_USER });
    const userResponse= response.data.authUser;
    const userId=userResponse.id;
    expect(userResponse.id).toEqual(expect.any(String))
    delete(userResponse.id);
    expect(JSON.stringify(userResponse)).toEqual(testUser);
    //SIGN In
    {
      const AUTH_USER = `
      mutation {
        authUser{
          ... on User{
            clubAccess{
              level,
              name,
              user{
                id
              }
            }
          }
        }
      }`;
      const response = await mutate({ mutation: AUTH_USER });
      const userResponse= response.data.authUser;
      expect(userResponse.clubAccess).toEqual([{
        name:testObj.name,
        level:'1',
        user:{id: userId}
      }]);
    }
  })  

  it("Update User",async ()=>{ 
    const testUser=JSON.stringify({
      mobile:"12345678",
      emergencyContact:"1223456789",
      address: "hello this is my address",
      displayPicture: "yoloasdfadsf",
      gmailAuthMail:"sdfgyuik,sadf"
  })
    const inputTestUser=unquoteUtil(testUser);
    const UPDATE_USER = `
      mutation {
        updateUser(user:`+inputTestUser+`){
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
    expect(JSON.stringify(userResponse)).toEqual(testUser);
  })

  it("Update User's Insti ID",async ()=>{
    const testUser={
        instituteId: "117CS0176",
        clubAccess:[{level:'1'},{level:'2'}]
    }
    const UPDATE_USER = `
      mutation {
        updateUser(user:{
          instituteId: "`+testUser.instituteId+`"          
        }){
          ... on User{
            instituteId,
            clubAccess{
              level
            }
          }
        }
      }
    `;

    const response = await mutate({ mutation: UPDATE_USER });
    expect(response.errors).toEqual(undefined)
    const userResponse= response.data.updateUser;
    expect(userResponse).toEqual(testUser);
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