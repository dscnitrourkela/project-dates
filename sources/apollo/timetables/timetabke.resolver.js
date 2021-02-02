/** @format */
/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const queries = {
    timetableById: (_, args, { dataSources }, __) => dataSources.TimetableAPI.getTimetableById(args.id),

    timetableByIdentifier: (_, args, { dataSources }, __) => dataSources.TimetableAPI.getTimetableByIdentifier(args.identifier)
};

const mutations = {
	addTimetable: (_, {timetable}, { dataSources }, __) => dataSources.TimetableAPI.addTimetable(timetable, "6009a59c3dae9456bce4a8f9"),
};

const fieldResolvers = {
	Timetable: {
		slotInfo: (parent, _, { dataSources }, __) => {
			const {slotInfo}=parent;
			const ResolvedCourses=slotInfo.map(async slot => {
				// eslint-disable-next-line require-atomic-updates
				slot.course= await dataSources.CourseAPI.getCourseById(slot.course)
				return slot
			})
			return ResolvedCourses
		},
		user: (parent, _, { dataSources }, __) => dataSources.UserAPI.getUserById(parent.user)
	}
};
// 
module.exports = { queries, mutations, fieldResolvers};
