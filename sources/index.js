

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const server = require("./apollo/server");
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
	console.log('connected to the database');
	// seed.seedData();
	// seed.seedPermissions();
});

server.listen(5000).then(({ url }) => {
	console.log(`Graphql running on ${url}`);
});
