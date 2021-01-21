/* eslint no-useless-constructor: "off", class-methods-use-this: "off" */

const CourseModel = require('../models/course.js')
const { DataSource } = require('apollo-datasource');

class CourseAPI extends DataSource {
	constructor() {
		super();
    }
    // eslint-disable-next-line no-empty-function
    initialize(_) {}

    getCourseById(id) {
        return CourseModel.findById(id);
    }

    getCourseBySubjectCode(subjectCode) {
        return CourseModel.findOne({subjectCode});
    }

    addCourse(course){
        const ltp={
            lecture: course.ltp[0],
            tutorial: course.ltp[1],
            // eslint-disable-next-line no-magic-numbers
            practical: course.ltp[2]
        }
        const courseObject = new CourseModel({
            subjectCode: course.subjectCode,
            name: course.name,
            ltp,
            credits: course.credits
        });
        return courseObject.save();
    }
}

module.exports = CourseAPI;