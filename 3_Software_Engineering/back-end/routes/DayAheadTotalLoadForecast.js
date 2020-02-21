const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');

const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Market',{useNewUrlParser: true,  useUnifiedTopology: true })
	.then(() => console.log("Connected to MongoDB..."))
	.catch(err => console.error('Problem',err));

const forecastSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	ActionTaskID: Number,
	Status: String,
	Year : Number,
	Month: Number,
	Day : Number,
	DateTime: String,
    AreaName: String,
    UpdateTime: String,
    TotalLoadValue: Number,
    AreaTypeCodeId: Number,
    AreaCodeId: Number,
    ResolutionCodeId: Number,
    MapCodeId: Number,
    RowHash: String
});

const mapSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	MapCodeText: String,
	MapCodeNote: String
});

const resolutionSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	ResolutionCodeText: String,
	ResolutionCodeNote: String
});

const areaSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	AreaTypeCodeText: String,
	AreaTypeCodeNote: String
});

const Forecast = mongoose.model('DayAheadTotalLoadForecast',forecastSchema,'DayAheadTotalLoadForecast');
const Map = mongoose.model('MapCode',mapSchema,'MapCode');
const Area = mongoose.model('AreaTypeCode',areaSchema,'AreaTypeCode');
const Resolution = mongoose.model('ResolutionCode',resolutionSchema,'ResolutionCode');



router.get('/:AreaName/:Resolution/date/:date',async (req, res) =>{
	
	var paramData = {
		areaName: req.params.AreaName,
		resolution: parseInt(req.params.Resolution),
		areatypeCode : '',
		mapCode :'',
		year: parseInt(req.params.date.substring(0,4)),
		month: parseInt(req.params.date.substring(5,7)),
		day: parseInt(req.params.date.substring(8,10)),
	  };

	var snt = [];

	  // Data template that will be returned from the request
	var actualData = {
		Source: 'entso-e',
		Dataset: 'DayAheadTotalLoadForecast',
		AreaName: paramData.areaName,
		AreaTypeCode: '', 
		MapCode: '', 
		ResolutionCode: '', 
		Year: paramData.year,
		Month: paramData.month,
		Day: paramData.day,
		DateTimeUTC: '',
		DayAheadTotalLoadForecastValue: '',
		UpdateTimeUTC: '',
	};

	var z = {
		maptext:'',
		resolutiontext: '',
		areatext: ''
	};

	const forecast = await Forecast.find({AreaName:paramData.areaName,Year:paramData.year,Month:paramData.month,Day:paramData.day,ResolutionCodeId:paramData.resolution})
								   .select({DateTime: 1,
									AreaName: 1,
									UpdateTime: 1,
									TotalLoadValue: 1,
									AreaTypeCodeId: 1,
									ResolutionCodeId: 1,
									MapCodeId: 1,
									_id :0})
									.sort({DateTime: 1});
									
									

	var j=0;
	while(j<forecast.length){
		snt.push( JSON.parse(JSON.stringify(actualData)));
		j = j + 1;
	}
		
	var i = 0;
	while(i<forecast.length){
		snt[i].DateTimeUTC = forecast[i].DateTime;
		snt[i].DayAheadTotalLoadForecastValue = forecast[i].TotalLoadValue;
		snt[i].UpdateTimeUTC = forecast[i].UpdateTime;
		i = i + 1;
	}

	const resolutions = await Resolution.find({Id:forecast[0].ResolutionCodeId})
										.select({ResolutionCodeText:1, _id :0 });
										
	const maps = await Map.find({Id :forecast[0].MapCodeId })
						  .select({MapCodeText:1, _id:0});
	
	const areas = await Area.find({Id :forecast[0].AreaTypeCodeId})
						    .select({AreaTypeCodeText:1, _id:0 });

	z.resolutiontext = resolutions[0].ResolutionCodeText;					  
	z.maptext = maps[0].MapCodeText;
	z.areatext = areas[0].AreaTypeCodeText;

	j = 0;
	while(j<snt.length){
		snt[j].AreaTypeCode = z.areatext;
		snt[j].MapCode = z.maptext;
		snt[j].ResolutionCode = z.resolutiontext;
		j = j + 1;
	}
	
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
			'DayAheadTotalLoadForecastValue',
			'UpdateTimeUTC',
		];

		const opts = { fields };

		try {
			// Create a parser with the given titles
			const parser = new Parser(opts);
			// Convert actualData to csv
			const csv = parser.parse(snt);
			
			console.log('csv');
			res.send(csv);
		} 
		catch (err) {
			console.error('There was an error converting data to csv');
			console.error(err);
		}
		} 
	else if (req.query.format === 'json') { 
		// if format is json, just send snt
		res.send(snt);
	} 
	else if (!req.query.format){
		//if no format the just send snt
		res.send(snt);
	}
	else {
		// if format is someting else, throw error 400
		//statusCode.sc400(res);
		res.send('Wrong!');
	}
});

router.get('/:AreaName/:Resolution/month/:date',async (req, res) =>{
	
	var paramData = {
		areaName: req.params.AreaName,
		resolution: parseInt(req.params.Resolution),
		areatypeCode : '',
		mapCode :'',
		year: parseInt(req.params.date.substring(0,4)),
		month: parseInt(req.params.date.substring(5,7)),
		day: ''
	  };

	var snt = [];

	  // Data template that will be returned from the request
	var actualData = {
		Source: 'entso-e',
		Dataset: 'DayAheadTotalLoadForecast',
		AreaName: paramData.areaName,
		AreaTypeCode: '', 
		MapCode: '', 
		ResolutionCode: '', 
		Year: paramData.year,
		Month: paramData.month,
		Day: '',
		DayAheadTotalLoadForecastValue: ''
	};

	var z = {
		maptext:'',
		resolutiontext: '',
		areatext: ''
	};
	
	
	const forecast = await Forecast.aggregate([
	
		{ "$match": {AreaName:paramData.areaName,Year:paramData.year,Month:paramData.month,ResolutionCodeId:paramData.resolution}},
		{ 	"$group": { 
			_id: {Day:"$Day",ResolutionCodeId:"$ResolutionCodeId",MapCodeId:"$MapCodeId",AreaTypeCodeId:"$AreaTypeCodeId"},
			count:{"$sum":"$TotalLoadValue"},
			}
		},
		{"$sort":{"_id.Day":1}}
		
	]);


	var j=0;
	while(j<forecast.length){
		snt.push( JSON.parse(JSON.stringify(actualData)));
		j = j + 1;
	}
		
	var i = 0;
	while(i<forecast.length){
		snt[i].Day = forecast[i]._id.Day;
		snt[i].DayAheadTotalLoadForecastValue = forecast[i].count;
		i = i + 1;
	}
	

	const resolutions = await Resolution.find({Id:forecast[0]._id.ResolutionCodeId})
										.select({ResolutionCodeText:1, _id :0 });
										
	const maps = await Map.find({Id :forecast[0]._id.MapCodeId })
						  .select({MapCodeText:1, _id:0});
	
	const areas = await Area.find({Id :forecast[0]._id.AreaTypeCodeId})
						    .select({AreaTypeCodeText:1, _id:0 });

	z.resolutiontext = resolutions[0].ResolutionCodeText;					  
	z.maptext = maps[0].MapCodeText;
	z.areatext = areas[0].AreaTypeCodeText;

	j = 0;
	while(j<snt.length){
		snt[j].AreaTypeCode = z.areatext;
		snt[j].MapCode = z.maptext;
		snt[j].ResolutionCode = z.resolutiontext;
		j = j + 1;
	}
	
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
			'DayAheadTotalLoadForecastValue',
		];

		const opts = { fields };

		try {
			// Create a parser with the given titles
			const parser = new Parser(opts);
			// Convert actualData to csv
			const csv = parser.parse(snt);
			
			console.log('csv');
			res.send(csv);
		} 
		catch (err) {
			console.error('There was an error converting data to csv');
			console.error(err);
		}
		} 
	else if (req.query.format === 'json') { 
		// if format is json, just send snt
		res.send(snt);
	} 
	else if (!req.query.format){
		//if no format the just send snt
		res.send(snt);
	}
	else {
		// if :format is someting else, throw error 400
		//statusCode.sc400(res);
		res.send('Wrong!');
	}

});



router.get('/:AreaName/:Resolution/year/:date',async (req, res) =>{
	
	var paramData = {
		areaName: req.params.AreaName,
		resolution: parseInt(req.params.Resolution),
		areatypeCode : '',
		mapCode :'',
		year: parseInt(req.params.date.substring(0,4)),
		month:'',
		day: ''
	  };

	var snt = [];

	  // Data template that will be returned from the request
	var actualData = {
		Source: 'entso-e',
		Dataset: 'DayAheadTotalLoadForecast',
		AreaName: paramData.areaName,
		AreaTypeCode: '', 
		MapCode: '', 
		ResolutionCode: '', 
		Year: paramData.year,
		Month: '',
		DayAheadTotalLoadForecastValue: ''
	};

	var z = {
		maptext:'',
		resolutiontext: '',
		areatext: ''
	};

	  
	const forecast = await Forecast.aggregate([
	
		{ "$match": {AreaName:paramData.areaName,Year:paramData.year,ResolutionCodeId:paramData.resolution}},
		{ 	"$group": { 
			_id: {Month:"$Month",ResolutionCodeId:"$ResolutionCodeId",MapCodeId:"$MapCodeId",AreaTypeCodeId:"$AreaTypeCodeId"},
			count:{"$sum":"$TotalLoadValue"},
			}
		},
		{"$sort":{"_id.Month":1}}
		
	]);

	var j=0;  
	while(j<forecast.length){
		snt.push( JSON.parse(JSON.stringify(actualData)));
		j = j + 1;
	}
		
	var i = 0;
	while(i<forecast.length){
		snt[i].Month = forecast[i]._id.Month;
		snt[i].DayAheadTotalLoadForecastValue = forecast[i].count;
		i = i + 1;
	}

	const resolutions = await Resolution.find({Id:forecast[0]._id.ResolutionCodeId})
										.select({ResolutionCodeText:1, _id :0 });


	const maps = await Map.find({Id :forecast[0]._id.MapCodeId })
							.select({MapCodeText:1, _id:0});
	

	
	const areas = await Area.find({Id :forecast[0]._id.AreaTypeCodeId})
							.select({AreaTypeCodeText:1, _id:0 });

	
	z.resolutiontext = resolutions[0].ResolutionCodeText;					  
	z.maptext = maps[0].MapCodeText;
	z.areatext = areas[0].AreaTypeCodeText;

	j = 0;
	while(j<snt.length){
		snt[j].AreaTypeCode = z.areatext;
		snt[j].MapCode = z.maptext;
		snt[j].ResolutionCode = z.resolutiontext;
		j = j + 1;
	}
	
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
			'DayAheadTotalLoadForecastValue',
		];

		const opts = { fields };

		try {
			// Create a parser with the given titles
			const parser = new Parser(opts);
			// Convert actualData to csv
			const csv = parser.parse(snt);

			console.log('csv');
			res.send(csv);
		} 
		catch (err) {
			console.error('There was an error converting data to csv');
			console.error(err);
		}
	} 
	else if (req.query.format === 'json') { 
		// if format is json, just send snt
		res.send(snt);
	} 
	else if (!req.query.format){
		//if no format the just send snt
		res.send(snt);
	}
	else {
		// if format is someting else, throw error 400
		//statusCode.sc400(res);
		res.send('Wrong!');
	}

});

module.exports = router;