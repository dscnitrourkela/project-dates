/** @format */

const types = `
    type LTP{
        lecture: Int
        tutorial: Int
        practical: Int
    }    
    type Course{
        id:ID
        subjectCode : String
        name : String
        ltp : LTP
        credits : Int
    }
    input CourseInputType{
        subjectCode : String!
        name : String!
        ltp : [Int!]
        credits : Int!
    }
`;

const queries = `
    courseBySubjectCode(subjectCode:String!):Course
    courseById(id:ID!):Course
`;

const mutations = `
addCourse(course:CourseInputType!):Course
`;

module.exports = { types, queries, mutations };

// updateCourse(id:ID!,course:CourseInputType!):Course
// deleteCourse(id:ID!):Course