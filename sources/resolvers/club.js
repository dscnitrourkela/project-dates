/** @format */

const queries = {
	clubs: (parent, args, { dataSources }, info) => {
		return dataSources.ClubAPI.getClubs(args);
	},
	clubByName: (parent, { name }, { dataSources }, info) => {
		return dataSources.ClubAPI.getClubByName(name);
	},
	clubById: (parent, { id }, { dataSources }, info) => {
		return dataSources.ClubAPI.getClubById(id);
	},
};

const mutations = {
	addClub: (parent, { club }, { dataSources }, info) => {
		return dataSources.ClubAPI.addClub(club);
	},
	updateClub: (parent, args, { dataSources }, info) => {
		return dataSources.ClubAPI.updateClub(args);
	},
	deleteClub: (parent, { id }, { dataSources }, info) => {
		return dataSources.ClubAPI.deleteClub(id);
	},
};

const fieldResolvers = {
	Club: {
		memberAccess: async (parent, args, { dataSources }, info) => {
			return await dataSources.AccessLevelAPI.resolveAccess(parent.memberAccess);
		},
		events: async (parent, args, { dataSources }, info) => {
			return await dataSources.ClubAPI.resolveClubEvents(parent.events);
		},
	},
};

module.exports = { queries, mutations, fieldResolvers };
