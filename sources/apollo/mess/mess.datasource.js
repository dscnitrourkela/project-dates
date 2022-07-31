/** @format */

const MessModel = require('./mess.model.js');
const { DataSource } = require('apollo-datasource');

class MessAPI extends DataSource {
	//eslint-disable-next-line no-useless-constructor
	constructor() {
		super();
	}
	// eslint-disable-next-line no-empty-function
	initialize(_) {}

	async getMessList() {
		const data = await MessModel.find({ expiry: false }).select({ messName: 1 });
		//const newData = data.map((element) => element.messName);
		//console.log(newData);
		return data;
	}

	async getMenuByMess(_id, isVeg = false) {
		// TODO: Add filter for veg
		const response = await MessModel.findOne({ _id, expiry: false }).select({ _id: 0 });
		return response.menu.map(element => {
			const { breakfast, lunch, snacks, dinner } = element;
			const dayMeal = { breakfast, lunch, snacks, dinner };
			for (const key of Object.keys(dayMeal)) {
				const { mainCourse, selectableDish, commonDish } = dayMeal[key];
				const flattenedMeal = { mainCourse, selectableDish, commonDish };
				for (const k of Object.keys(flattenedMeal)) {
					const itemArray = flattenedMeal[k].map(food => food.dish);
					flattenedMeal[k] = itemArray;
				}
				dayMeal[key] = flattenedMeal;
			}
			return dayMeal;
		});
	}
}

module.exports = MessAPI;
