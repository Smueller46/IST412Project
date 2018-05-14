// Load the module dependencies
const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {
	// Use Mongoose to connect to MongoDB
	mongoose.set('debug', true);
	const db = mongoose.connect(config.db);

	// Load the 'User' model 
	require('../app/models/user.server.model');
	require('../app/models/internships.server.model');
	require('../app/models/scholarships.server.model');
	require('../app/models/application.server.model');

	// Return the Mongoose connection instance
	return db;
};
