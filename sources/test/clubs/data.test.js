const {beforeTests,unquoteUtil, afterTests, apolloServer, PERMISSION_DENIED_TEST} = require("../testHelper");

// Pre and Post Test Scripts
beforeAll(beforeTests);
afterAll(afterTests);

describe('Results: Clubs Queries and Mutations', () => {  
    const { query, mutate } = apolloServer("a8mjiKYtt0PefnS524",["superuser.all"]);
    let testClub={
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
    }
    it('Create Club', async () => {               
      const testClub1=JSON.stringify({
        clubName:testClub.clubName
      })
      const inputTesetClub1=unquoteUtil(testClub1);
      const CREATE_CLUB = `
        mutation{
          addClub(club:`+inputTesetClub1+`){
            ... on Club{
              clubName,
              id
            }
          }
        }
      `;

      const response = await mutate({ mutation: CREATE_CLUB });
      const clubResponse=response.data.addClub;
      testClub.id=clubResponse.id;
      expect(clubResponse.clubName).toEqual(testClub.clubName); 
    });

    it('Update Club with other info', async () => {               
      const testClubObj={...testClub};
      delete(testClubObj.id);
      const testClub2=JSON.stringify(testClubObj)
      const inputTesetClub2=unquoteUtil(testClub2);
      const UPDATE_CLUB = `
        mutation{
          updateClub(id:"`+testClub.id+`",club:`+inputTesetClub2+`){
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
      expect(JSON.stringify(clubResponse)).toEqual(testClub2); 
    });

    it('Delete club', async () => {               
      const DELETE_CLUB = `
        mutation{
          deleteClub(id:"`+testClub.id+`"){
            ... on Response{
              success
            }
          }
        }
      `;

      const response = await mutate({ mutation: DELETE_CLUB });      
      expect(response.data.deleteClub.success).toEqual(true); 
    });
})