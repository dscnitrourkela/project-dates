/* eslint no-useless-constructor: "off", class-methods-use-this: "off" */

const TimetableModel = require('./timetable.model.js')
const { DataSource } = require('apollo-datasource');

class TimetableAPI extends DataSource {
	constructor() {
		super();
    }
    // eslint-disable-next-line no-empty-function
    initialize(_) {}

    getTimetableById(id) {
        return TimetableModel.findById(id);
    }

    getTimetableByIdentifier(identifier) {
        const regex = new RegExp(identifier,'u')
        return TimetableModel.find({ "identifier" : { $regex: regex, $options: 'i' } });
    }

    addTimetable(timetable, userId){
        let slotInfo =[]
        for (const slotInfoElement of timetable.slotInfo){
            slotInfo.push(slotInfoElement);
        }
        const timetableObject = new TimetableModel({
            user: userId,
            identifier:timetable.identifier,
            slotInfo,
        });
        return timetableObject.save();
    }
}

module.exports = TimetableAPI;