/** @format */

const Events = require('./event.model.js');
const Users = require('../users/user.model.js');
const Clubs = require('../clubs/club.model.js');
const Venues = require('../venues/venue.model.js');
const AccessLevel = require('../accessLevels/accessLevel.model.js');
const { DataSource } = require('apollo-datasource');

class EventAPI extends DataSource {
	constructor() {
		super();
	}
	initialize(config) {}
	getEvents(args) {
		return Events.find(args);
	}
	getEventById(id) {
		return Events.findById(id);
	}
	async resolveEventAttendees(userArray) {
		return await Users.find({
			_id: { $in: userArray },
		});
	}
	async addEvent(event) {
		let retPromise = {};
		// Create Event with basic types;
		let createdEvent = await Events.create({
			eventName: event.eventName,
			startDateTime: event.startDateTime,
			endDateTime: event.endDateTime,
			registrationPrice: event.registrationPrice,
			registrationCount: event.registrationCount,
			otherDescription: event.otherDescription,
			announcements: event.announcements,
			link: event.link,
			picture: event.picture,
			backgroundColor: event.backgroundColor
		});

		//Add nested types
		//1.Attendees
		const eventId = createdEvent._id;
		const attendeesArray = event.attendees;

		if (attendeesArray != undefined && attendeesArray.length > 0) {
			await Promise.all(
				attendeesArray.map(async (attendee, index) => {
					const userId = attendee;
					const foundUser = await Users.findById(userId);
					createdEvent.attendees.push(foundUser._id);
				})
			);
		}
		//2. organizer
		if (event.organizer != undefined) {
			const organizerId = event.organizer;
			const foundOrganizer = await Clubs.findById(organizerId);
			createdEvent.organizer = foundOrganizer._id;
			foundOrganizer.events.push(eventId);
			await foundOrganizer.save();
		}

		//3. Venue

		if (event.venue != undefined) {
			const venueId = event.venue;
			const foundVenue = await Venues.findById(venueId);
			createdEvent.venue = foundVenue._id;
		}

		retPromise = await createdEvent.save();
		return retPromise;
	}

	async updateEvent(args) {
		const eventId = args.id;
		const event = args.event;
		let retPromise = {};
		// Update Event with basic types;
		const foundEvent = await Events.findById(eventId);
		let updatedEvent = new Events(foundEvent);
		updatedEvent = Object.assign(updatedEvent, event);
		updatedEvent = new Events(updatedEvent);

		//Add nested types
		//1.Attendees
		const attendeesArray = event.attendees;
		if (attendeesArray != undefined && attendeesArray.length > 0) {
			await Promise.all(
				attendeesArray.map(async (attendee, index) => {
					const userId = attendee;
					const foundUser = await Users.findById(userId);
					updatedEvent.attendees.push(foundUser._id);
				})
			);
		}
		//2. organizer
		if (event.organizer != undefined) {
			const organizerId = event.organizer;
			const foundOrganizer = await Clubs.findById(organizerId);
			updatedEvent.organizer = foundOrganizer._id;
			foundOrganizer.events.push(eventId);
			await foundOrganizer.save();
		}

		//3. Venue
		if (event.venue != undefined) {
			const venueId = event.venue;
			const foundVenue = await Venues.findById(venueId);
			updatedEvent.venue = foundVenue._id;
		}

		retPromise = await updatedEvent.save();
		return retPromise;
	}

	async deleteEvent(id) {
		const foundEvent = await Events.findById(id);
		return await foundEvent.deleteOne();
	}
	async increaseRegistrationCount(id) {
		const eventId = id;
		let retPromise = {};
		// Update Event with basic types;
		const foundEvent = await Events.findById(eventId);
		let updatedEvent = new Events(foundEvent);
		updatedEvent.registrationCount+=1;
		updatedEvent = new Events(updatedEvent);
		retPromise = await updatedEvent.save();
		return retPromise;
	}

	async deleteEvent(id) {
		const foundEvent = await Events.findById(id);
		return await foundEvent.deleteOne();
	}
}
module.exports = EventAPI;
