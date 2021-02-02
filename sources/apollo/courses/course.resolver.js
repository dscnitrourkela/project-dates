/** @format */
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const queries = {
    courseById: (_, args, { dataSources }, __) => dataSources.CourseAPI.getCourseById(args.id),

    courseBySubjectCode: (_, args, { dataSources }, __) => dataSources.CourseAPI.getCourseBySubjectCode(args.subjectCode)
};

const mutations = {
	addCourse: (_, {course}, { dataSources }, __) => dataSources.CourseAPI.addCourse(course),
}

module.exports = { queries, mutations };
