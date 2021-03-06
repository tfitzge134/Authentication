// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require the error handlers
const {
  handleErrors,
  handleValidationErrors
} = require('./middleware/custom_errors');

// Require the user resource routes and controllers
const userController = require('./controllers/users');

// Require the job resource routes and controllers
const jobController = require('./controllers/jobs');

// Instantiate express application object
const app = express();

// The `.use` method sets up middleware in Express

// Set up cors middleware and make sure that it
// comes before our routes are used.
app.use(cors());

// Add `express.json` middleware which will
// parse JSON requests into JS objects before
// they reach the route files.
app.use(express.json());

// The urlencoded middleware parses requests which use
// a specific content type (such as when using Axios)
app.use(express.urlencoded({ extended: true }));

// Configure the route middleware
app.use('/api', userController);
app.use('/api/jobs', jobController);

// The catch all for handling database and Mongoose
// validation errors
app.use(handleValidationErrors);

// The catch all for handling errors
app.use(handleErrors);

// Define port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
const port = process.env.PORT || 4000;
// Run server on designated port
app.listen(port, () => {
  console.log('listening on port ' + port);
});
