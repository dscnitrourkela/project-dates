/** @format */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const server = require('./apollo/server');
const PORT_NUMBER = 8000;
dotenv.config();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/elaichi');
mongoose.connection.once('open', () => {
	console.info('connected to the database');
	console.timeEnd('mongo');
	// seed.seedData();
	// seed.seedPermissions();
});
mongoose.connection.on('error', err => {
	console.error(err);
	console.timeEnd('mongo');
});

server.listen(PORT_NUMBER).then(({ url }) => {
	console.info(`Graphql running on ${url}`);
	console.timeEnd('apollo');
});
console.time('apollo');
console.time('mongo');
