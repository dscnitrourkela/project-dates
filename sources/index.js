/** @format */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const seed = require('./helpers/seed_database');
const cloudinary = require('cloudinary').v2;
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

//Cloudinary Config
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


server.listen(5000).then(({ url }) => {
	console.log(`Graphql running on ${url}`);
});
