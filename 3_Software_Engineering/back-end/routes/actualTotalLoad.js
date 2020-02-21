const express = require('express');
const router = express.Router(); // initialize express Router
const statusCode = require('../utils/statusCodes');
const { Parser } = require('json2csv');

// Initialize Mongo Client
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var database = 'EnergyMarketApp';

// @route   GET /:AreaName/:Resolution/:Year/:Month/:Day
// @desc    ActualTotalLoad 1A
// @access  Public
router.get('/:AreaName/:Resolution/:Year/:Month/:Day/:format', (req, res) => {
  // Parameter Data
  const paramData = {
    areaName: req.params.AreaName,
    resolution: req.params.Resolution,
    year: req.params.Year,
    month: req.params.Month,
    day: req.params.Day,
  };

  // Data that will be returned from the request
  var actualData = {
    Source: 'entso-e',
    Dataset: 'ActualTotalLoad',
    AreaName: paramData.areaName,
    AreaTypeCode: '',
    MapCode: '',
    ResolutionCode: paramData.resolution,
    Year: paramData.year,
    Month: paramData.month,
    Day: paramData.day,
    DateTimeUTC: '',
    ActualTotalLoadValue: '',
    UpdateTimeUTC: '',
  };

  // Find mongo entries with specified parameters
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;

    var dbo = db.db(database);
    // access ActualTotalLoad collection
    dbo.collection('ActualTotalLoad').findOne(
      {
        $or: [
          { AreaName: paramData.areaName },
          { ResolutionCodeId: paramData.resolution },
          { Year: paramData.year },
          { Month: paramData.month },
          { Day: paramData.day },
        ],
      },
      function(err, result) {
        // Assign values to actual data
        try {
          actualData.AreaTypeCode = result.AreaTypeCodeId;
          actualData.MapCode = result.MapCodeId;
          actualData.DateTimeUTC = result.DateTime;
          actualData.ActualTotalLoadValue = result.TotalLoadValue;
          actualData.UpdateTimeUTC = result.UpdateTime;

          // if parameter :format is 'csv', convert actualData to csv format
          if (req.params.format === 'csv') {
            // Set the field titles
            const fields = [
              'Source',
              'Dataset',
              'AreaName',
              'AreaTypeCode',
              'MapCode',
              'ResolutionCode',
              'Year',
              'Month',
              'Day',
              'DateTimeUTC',
              'ActualTotalLoadValue',
              'UpdateTimeUTC',
            ];
            const opts = { fields };

            try {
              // Create a parser with the given titles
              const parser = new Parser(opts);
              // Convert actualData to csv
              const csv = parser.parse(actualData);
              console.log(csv);
            } 
            catch (err) {
              console.error('There was an error converting data to csv');
              console.error(err);
            }
          } 
          else if (req.params.format === 'json') {
            // if :format is json, just print actualData
            console.log(actualData);
          } 
          else {
            // if :format is someting else, throw error 400
            statusCode.sc400(res);
          }
        } 
        catch {
          try {
            if (
              result.AreaTypeCodeId === '' ||
              result.MapCodeId === '' ||
              result.DateTime === '' ||
              result.TotalLoadValue === '' ||
              result.UpdateTime === ''
            ) {
              statusCode.sc403(res); // if parameters are empty return 403
            }
          } 
          catch {
            statusCode.sc400(res); // if parameters are wrong return 400
          }
        }

        db.close(); // close connection with db
      }
    );
  });
});

module.exports = router;