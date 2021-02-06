

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const server = require("./apollo/server");
const PORT_NUMBER = 5000;
dotenv.config();

//Mongoose Configs
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/elaichi', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.once('open', () => {
	console.info('connected to the database')
	console.timeEnd("mongo")
	// seed.seedData();
	// seed.seedPermissions();
});

server.listen(PORT_NUMBER).then(({ url }) => {
	console.info(`Graphql running on ${url}`);	
	console.timeEnd("apollo")
});
console.time("apollo")
console.time("mongo")
