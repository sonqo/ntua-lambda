// Require dependencies
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

// Fetch routes
const home = require('./routes/home');
const admin = require('./routes/admin');
const actualTotalLoad = require('./routes/actualTotalLoad');
const actualvsForecast = require('./routes/actualvsForecast');
const dayAheadTotalLoadForecast = require('./routes/dayAheadTotalLoadForecast');
const aggregatedGenerationPerType = require('./routes/aggregatedGenerationPerType');

// Initialize express server
const server = express();

// Body parser middleware
server.use(bodyParser.urlencoded({ extended: false })); // key-value pairs
server.use(bodyParser.json());

// Passport middleware
server.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

// Use Routes
const baseURL = '/energy/api';
server.use(`${baseURL}/`, home);
server.use(`${baseURL}/Admin`, admin);
server.use(`${baseURL}/ActualTotalLoad`, actualTotalLoad);
server.use(`${baseURL}/ActualvsForecast`, actualvsForecast);
server.use(`${baseURL}/DayAheadTotalLoadForecast`, dayAheadTotalLoadForecast);
server.use(
	`${baseURL}/AggregatedGenerationPerType`,
	aggregatedGenerationPerType
);

// Configure port
const port = 8765;

// Listen to specified port
server.listen(port, () => {
	console.log(`Express_Server listening on port: ${port}`);
});
