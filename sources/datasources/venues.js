/** @format */

const Venues = require('../models/venue.js');
const AccessLevel = require('../models/accessLevel.js');
const { DataSource } = require('apollo-datasource');

class VenueAPI extends DataSource {
	constructor() {
		super();
	}
	initialize(config) {}
	getVenues(args) {
		return Venues.find(args);
	}
	getVenueById(id) {
		return Venues.findById(id);
	}
	async addVenue(venue) {
		let createdVenue = new Venues(venue);
		return await createdVenue.save();
	}
	async updateVenue(args) {
		const venueId = args.id;
		const venue = args.venue;

		const foundVenue = await Venues.findById(venueId);
		let updatedVenue = new Venues(foundVenue);
		updatedVenue = Object.assign(updatedVenue, venue);
		updatedVenue = new Venues(updatedVenue);

		return await updatedVenue.save();
	}

	async deleteVenue(id) {
		const foundVenue = await Venues.findById(id);
		return await foundVenue.deleteOne();
	}
}

module.exports = VenueAPI;
