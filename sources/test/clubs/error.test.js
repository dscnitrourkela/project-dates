const {beforeTests, afterTests, apolloServer, PERMISSION_DENIED_TEST, INVALID_INPUT_TEST} = require("../testHelper");
const {eventSeeder} = require("../../helpers/seed_database");
// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);


describe('Errors: Clubs Permission Denied', () => {  
    const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["test.test"]);    
    it('Create Club', async () => {               
      const CREATE_CLUB = `
        mutation{
          addClub(club:{
              clubName:"DSC"
          }){
            ... on ErrorClass{
                message,
                code
            }
          }
        }
      `;

      const response = await mutate({ mutation: CREATE_CLUB });
      expect(response.data.addClub).toEqual(PERMISSION_DENIED_TEST); 
    });

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
      expect(response.data.updateClub).toEqual(PERMISSION_DENIED_TEST); 
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
      expect(response.data.deleteClub).toEqual(PERMISSION_DENIED_TEST); 
    });
})
