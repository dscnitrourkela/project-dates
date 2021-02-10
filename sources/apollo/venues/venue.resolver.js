

const queries = {
	venues: (parent, args, { dataSources }, info) => {
		return dataSources.VenueAPI.getVenues(args);
	},
	venueByName: (parent, { name }, { dataSources }, info) => {
		return dataSources.VenueAPI.getVenueByName(name);
	},
	venueById: (parent, { id }, { dataSources }, info) => {
		return dataSources.VenueAPI.getVenueById(id);
	},
};

const mutations = {
	addVenue: (parent, { venue }, { dataSources }, info) => {
		return dataSources.VenueAPI.addVenue(venue);
	},
	updateVenue: (parent, args, { dataSources }, info) => {
		return dataSources.VenueAPI.updateVenue(args);
	},
	deleteVenue: (parent, { id }, { dataSources }, info) => {
		return dataSources.VenueAPI.deleteVenue(id);
	},
};

const fieldResolvers = {};

module.exports = { queries, mutations, fieldResolvers };
