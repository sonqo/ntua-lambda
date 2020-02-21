// Require dependencies
const express = require('express');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');

// Fetch routes
const actualTotalLoad = require('./routes/actualTotalLoad');
const DayAheadTotalLoadForecast = require('./routes/DayAheadTotalLoadForecast');
const home = require('./routes/home');

// Initialize express server
const server = express();

// Body parser middleware
server.use(bodyParser.urlencoded({ extended: false })); // key-value pairs
server.use(bodyParser.json());

// Create a limiter for api requests
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Out of quota, time expired.",
  statusCode: 402,
});

// Use limiter in every request
server.use(limiter);

// Use Routes
const baseURL = '/energy/api';
server.use(`${baseURL}/ActualTotalLoad`, actualTotalLoad);
server.use(`${baseURL}/DayAheadTotalLoadForecast`, DayAheadTotalLoadForecast);
server.use('/', home);

// Configure port 
const port = 8765;

// Listen to specified port
server.listen(port, () => {
  console.log(`Express_Server listening on port: ${port}`);
});
