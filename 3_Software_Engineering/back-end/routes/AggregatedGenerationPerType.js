const express = require('express');
const router = express.Router(); // initialize express Router
const statusCode = require('../utils/statusCodes');
const { Parser } = require('json2csv');

// Initialize Mongo Client
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';
var database = 'Market';

// @route   GET /:AreaName/:Resolution/date/:date
// @desc    AggregatedGenerationPerType 3A
// @access  Public
router.get('/:AreaName/:Resolution/date/:date', (req, res) => {
  // Parameter Data & 2 extra fields
  var paramData = {
    areaName: req.params.AreaName,
    resolution: parseInt(req.params.Resolution),
    areatypeCode : '',
    mapCode :'',
    productionType :'',
    year: parseInt(req.params.date.substring(0,4)),
    month: parseInt(req.params.date.substring(5,7)),
    day: parseInt(req.params.date.substring(8,10)),
  };

  // Data that will be returned from the request
  var actualData = {
    Source: 'entso-e',
    Dataset: 'AggregatedGenerationPerType',
    AreaName: paramData.areaName,
    AreaTypeCode: '', //connect with AreaTypeCode db
    MapCode: '', //connect with MapCode db
    ResolutionCode: '', //connect with ResolutionCode db
    ProductionType: '', //connect with ProductionType db
    Year: paramData.year,
    Month: paramData.month,
    Day: paramData.day,
    DateTimeUTC: '',
    AggregatedGenerationPerTypeValue: '',
    UpdateTimeUTC: '',
  };

  // Find mongo entries with specified parameters
  MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;

    var dbo = db.db(database);
    // access AggregatedGenerationPerType collection
    dbo.collection('AggregatedGenerationPerType').findOne(
      {
        $and: [
          { AreaName: paramData.areaName },
          { ResolutionCodeId: paramData.resolution },
          { Year: paramData.year }, //maybe actual Data Year
          { Month: paramData.month }, //because it's number there
          { Day: paramData.day },
        ],
      },
      function(err, result) {
        // Assign values to actual data
        try {

          paramData.mapCode = result.MapCodeId;
          paramData.areatypeCode =result.AreaTypeCodeId;
          paramData.productionType = result.ProductionTypeId;

          actualData.DateTimeUTC = result.DateTime; //maybe need convert to timestamp
          actualData.UpdateTimeUTC = result.UpdateTime;  //maybe need convert to timestamp
          AggregatedGenerationPerTypeValue = 

          // access AreaTypeCode collection
          dbo.collection('AreaTypeCode').findOne({Id: paramData.areatypeCode },function(err,result){
            
            if (err) throw err;  
            
            actualData.AreaTypeCode = result.AreaTypeCodeText;

            dbo.collection('MapCode').findOne({Id: paramData.mapCode },function(err,result){
              
              if (err) throw err;
              
              actualData.MapCode = result.MapCodeText;

              dbo.collection('ResolutionCode').findOne({Id: paramData.resolution },function(err,result){
                if (err) throw err;
                
                actualData.ResolutionCode = result.ResolutionCodeText;

                dbo.collection('ProductionType').findOne({Id: paramData.productionType },function(err,result){
                    if (err) throw err;
                    
                    actualData.ProductionType = result.ProductionTypeText;
                
                    // if query parameter format is 'csv', convert actualData to csv format
                    if (req.query.format === 'csv') {
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
                        'ProductionType',
                        'UpdateTimeUTC',
                        ];
                        const opts = { fields };

                        try {
                        // Create a parser with the given titles
                        const parser = new Parser(opts);
                        // Convert actualData to csv
                        const csv = parser.parse(actualData);
                        res.send(csv);//res.send()...
                        } 
                        catch (err) {
                        console.error('There was an error converting data to csv');
                        console.error(err);
                        }
                    } 
                else if (req.query.format === 'json') { //maybe else only
                    // if :format is json, just print actualData
                    res.send(actualData);
                } 
                else if (!req.query.format){
                    //if no format the just send actualData
                    res.send(actualData);//res.send(actualData)...
                }
                else {
                    // if :format is someting else, throw error 400
                    statusCode.sc400(res);
                }
                  
                })
              })
            })



          })
        
        //actualData.AreaTypeCode = result.AreaTypeCodeId; //connect !!
        //access MapCode collection
        //db.close(); // close connection with db
        //actualData.MapCode = result.MapCodeId; //connect !!
        //access ResolutionCode collection 
        } 
        catch {
          try {
            if (
              result.AreaTypeCodeId === '' ||
              result.MapCodeId === '' ||
              result.DateTime === '' ||
              result.ProductionTypeId === '' || //needs date error handling too
              result.UpdateTime === '' //maybe param. ....
            ) {
              statusCode.sc403(res); // if parameters are empty return 403
            }
          } 
          catch {
            statusCode.sc400(res); // if parameters are wrong return 400
          }
        }

        //db.close(); // close connection with db
      }
    );
  });
});

module.exports = router;