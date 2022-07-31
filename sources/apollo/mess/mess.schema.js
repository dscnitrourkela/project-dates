/** @format */

const types = `
    type Item{
        dish: String
        isVeg: Boolean
    }

    type Meal{
        mainCourse: [String]
        selectableDish: [String]
        commonDish: [String]
    }  

    type DayMenu{
        day: Int
        breakfast : Meal
        lunch : Meal
        snacks : Meal
        dinner : Meal
    }
    type MessList{
        id: ID
        messName: String
    }
`;

const queries = `
    messList:[MessList]
    menuByMess(id:ID!, isVeg:Boolean):[DayMenu]
`;

const mutations = `

`;

module.exports = { types, queries, mutations };
