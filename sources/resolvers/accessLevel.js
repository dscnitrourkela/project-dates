const queries = {};

const mutations = {};

const fieldResolvers = {
  AccessLevel: {
    user: async (parent, args, { dataSources }, info) => {
      return await dataSources.UserAPI.getUserById(parent.user);
    },
    club: async (parent, args, { dataSources }, info) => {
      // if(permissions.find((permission)=>permission=="users.by"))
      //     return await dataSources.ClubAPI.getClubById(parent.club);
      // else{
      //     const error=new Error("Permission Denied for club field");
      //     error.code="ERROR401";
      //     throw error;
      // }
      return await dataSources.ClubAPI.getClubById(parent.club);
    },
  },
};

module.exports = { queries, mutations, fieldResolvers };
