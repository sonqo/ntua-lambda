const express = require('express');
const router = express.Router();

const { Parser } = require('json2csv');

const Map = require('../models/Map');
const Area = require('../models/Area');
const Forecast = require('../models/Forecast');
const Resolution = require('../models/Resolution');
const authFunction = require('../validation/auth');

const resonums = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

router.get(
	'/:AreaName/:Resolution/date/:date',
	authFunction.default,
	async (req, res) => {
		if (
			req.params.date.length != 10 ||
			req.params.date[4] != '-' ||
			req.params.date[7] != '-' ||
			!(req.params.date[0] in numbers) ||
			!(req.params.date[1] in numbers) ||
			!(req.params.date[2] in numbers) ||
			!(req.params.date[3] in numbers) ||
			!(req.params.date[5] in numbers) ||
			!(req.params.date[6] in numbers) ||
			!(req.params.date[8] in numbers) ||
			!(req.params.date[9] in numbers)
		) {
			res.status(400).send('No proper date !!');
		} else if (req.params.AreaName === ' ') {
			res.status(400).send('No proper area name !');
		} else if (
			req.params.Resolution === ' ' ||
			!resonums.includes(req.params.Resolution)
		) {
			res.status(400).send('No proper resolution !');
		} else {
			var paramData = {
				areaName: req.params.AreaName,
				resolution: parseInt(req.params.Resolution),
				areatypeCode: '',
				mapCode: '',
				year: parseInt(req.params.date.substring(0, 4)),
				month: parseInt(req.params.date.substring(5, 7)),
				day: parseInt(req.params.date.substring(8, 10))
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
				UpdateTimeUTC: ''
			};

			var z = {
				maptext: '',
				resolutiontext: '',
				areatext: ''
			};

			try {
				const forecast = await Forecast.find({
					AreaName: paramData.areaName,
					Year: paramData.year,
					Month: paramData.month,
					Day: paramData.day,
					ResolutionCodeId: paramData.resolution
				})
					.select({
						DateTime: 1,
						AreaName: 1,
						UpdateTime: 1,
						TotalLoadValue: 1,
						AreaTypeCodeId: 1,
						ResolutionCodeId: 1,
						MapCodeId: 1,
						_id: 0
					})
					.sort({ DateTime: 1 });

				var j = 0;
				while (j < forecast.length) {
					snt.push(JSON.parse(JSON.stringify(actualData)));
					j = j + 1;
				}

				var i = 0;
				while (i < forecast.length) {
					snt[i].DateTimeUTC = forecast[i].DateTime;
					snt[i].DayAheadTotalLoadForecastValue = forecast[i].TotalLoadValue;
					snt[i].UpdateTimeUTC = forecast[i].UpdateTime;
					i = i + 1;
				}

				try {
					const resolutions = await Resolution.find({
						Id: forecast[0].ResolutionCodeId
					}).select({ ResolutionCodeText: 1, _id: 0 });

					const maps = await Map.find({ Id: forecast[0].MapCodeId }).select({
						MapCodeText: 1,
						_id: 0
					});

					const areas = await Area.find({
						Id: forecast[0].AreaTypeCodeId
					}).select({ AreaTypeCodeText: 1, _id: 0 });

					z.resolutiontext = resolutions[0].ResolutionCodeText;
					z.maptext = maps[0].MapCodeText;
					z.areatext = areas[0].AreaTypeCodeText;

					j = 0;
					while (j < snt.length) {
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
							'UpdateTimeUTC'
						];

						const opts = { fields };

						try {
							// Create a parser with the given titles
							const parser = new Parser(opts);
							// Convert actualData to csv
							const csv = parser.parse(snt);

							console.log('csv');
							res.send(csv);
						} catch (err) {
							console.error('There was an error converting data to csv');
							console.error(err);
						}
					} else if (req.query.format === 'json') {
						// if format is json, just send snt
						res.send(snt);
					} else if (!req.query.format) {
						//if no format the just send snt
						res.send(snt);
					} else {
						// if format is someting else, throw error 400
						res.send('Wrong!');
					}
				} catch (er) {
					res.status(403).send('No data');
				}
			} catch (err) {
				res.status(400).send('Error', err);
			}
		}
	}
);

router.get(
	'/:AreaName/:Resolution/month/:date',
	authFunction.default,
	async (req, res) => {
		if (
			req.params.date.length != 7 ||
			req.params.date[4] != '-' ||
			!(req.params.date[0] in numbers) ||
			!(req.params.date[1] in numbers) ||
			!(req.params.date[2] in numbers) ||
			!(req.params.date[3] in numbers) ||
			!(req.params.date[5] in numbers) ||
			!(req.params.date[6] in numbers)
		) {
			res.status(400).send('No proper date !!');
		} else if (req.params.AreaName === ' ') {
			res.status(400).send('No proper area name !');
		} else if (
			req.params.Resolution === ' ' ||
			!resonums.includes(req.params.Resolution)
		) {
			res.status(400).send('No proper resolution !');
		} else {
			var paramData = {
				areaName: req.params.AreaName,
				resolution: parseInt(req.params.Resolution),
				areatypeCode: '',
				mapCode: '',
				year: parseInt(req.params.date.substring(0, 4)),
				month: parseInt(req.params.date.substring(5, 7)),
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
				DayAheadTotalLoadForecastByDayValue: ''
			};

			var z = {
				maptext: '',
				resolutiontext: '',
				areatext: ''
			};

			try {
				const forecast = await Forecast.aggregate([
					{
						$match: {
							AreaName: paramData.areaName,
							Year: paramData.year,
							Month: paramData.month,
							ResolutionCodeId: paramData.resolution
						}
					},
					{
						$group: {
							_id: {
								Day: '$Day',
								ResolutionCodeId: '$ResolutionCodeId',
								MapCodeId: '$MapCodeId',
								AreaTypeCodeId: '$AreaTypeCodeId'
							},
							count: { $sum: '$TotalLoadValue' }
						}
					},
					{ $sort: { '_id.Day': 1 } }
				]);

				var j = 0;
				while (j < forecast.length) {
					snt.push(JSON.parse(JSON.stringify(actualData)));
					j = j + 1;
				}

				var i = 0;
				while (i < forecast.length) {
					snt[i].Day = forecast[i]._id.Day;
					snt[i].DayAheadTotalLoadForecastByDayValue = forecast[i].count;
					i = i + 1;
				}

				try {
					const resolutions = await Resolution.find({
						Id: forecast[0]._id.ResolutionCodeId
					}).select({ ResolutionCodeText: 1, _id: 0 });

					const maps = await Map.find({
						Id: forecast[0]._id.MapCodeId
					}).select({ MapCodeText: 1, _id: 0 });

					const areas = await Area.find({
						Id: forecast[0]._id.AreaTypeCodeId
					}).select({ AreaTypeCodeText: 1, _id: 0 });

					z.resolutiontext = resolutions[0].ResolutionCodeText;
					z.maptext = maps[0].MapCodeText;
					z.areatext = areas[0].AreaTypeCodeText;

					j = 0;
					while (j < snt.length) {
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
							'DayAheadTotalLoadForecastByDayValue'
						];

						const opts = { fields };

						try {
							// Create a parser with the given titles
							const parser = new Parser(opts);
							// Convert actualData to csv
							const csv = parser.parse(snt);

							console.log('csv');
							res.send(csv);
						} catch (err) {
							console.error('There was an error converting data to csv');
							console.error(err);
						}
					} else if (req.query.format === 'json') {
						// if format is json, just send snt
						res.send(snt);
					} else if (!req.query.format) {
						//if no format the just send snt
						res.send(snt);
					} else {
						// if :format is someting else, throw error 400
						res.send('Wrong!');
					}
				} catch (err) {
					res.status(403).send('No data');
				}
			} catch (err) {
				res.status(400).send('Error', err);
			}
		}
	}
);

router.get(
	'/:AreaName/:Resolution/year/:date',
	authFunction.default,
	async (req, res) => {
		if (
			req.params.date.length != 4 ||
			!(req.params.date[0] in numbers) ||
			!(req.params.date[1] in numbers) ||
			!(req.params.date[2] in numbers) ||
			!(req.params.date[3] in numbers)
		) {
			res.status(400).send('No proper date !!');
		} else if (req.params.AreaName === ' ') {
			res.status(400).send('No proper area name !');
		} else if (
			req.params.Resolution === ' ' ||
			!resonums.includes(req.params.Resolution)
		) {
			res.status(400).send('No proper resolution !');
		} else {
			var paramData = {
				areaName: req.params.AreaName,
				resolution: parseInt(req.params.Resolution),
				areatypeCode: '',
				mapCode: '',
				year: parseInt(req.params.date.substring(0, 4)),
				month: '',
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
				DayAheadTotalLoadForecastByMonthValue: ''
			};

			var z = {
				maptext: '',
				resolutiontext: '',
				areatext: ''
			};

			try {
				const forecast = await Forecast.aggregate([
					{
						$match: {
							AreaName: paramData.areaName,
							Year: paramData.year,
							ResolutionCodeId: paramData.resolution
						}
					},
					{
						$group: {
							_id: {
								Month: '$Month',
								ResolutionCodeId: '$ResolutionCodeId',
								MapCodeId: '$MapCodeId',
								AreaTypeCodeId: '$AreaTypeCodeId'
							},
							count: { $sum: '$TotalLoadValue' }
						}
					},
					{ $sort: { '_id.Month': 1 } }
				]);

				var j = 0;
				while (j < forecast.length) {
					snt.push(JSON.parse(JSON.stringify(actualData)));
					j = j + 1;
				}

				var i = 0;
				while (i < forecast.length) {
					snt[i].Month = forecast[i]._id.Month;
					snt[i].DayAheadTotalLoadForecastByMonthValue = forecast[i].count;
					i = i + 1;
				}

				try {
					const resolutions = await Resolution.find({
						Id: forecast[0]._id.ResolutionCodeId
					}).select({ ResolutionCodeText: 1, _id: 0 });

					const maps = await Map.find({
						Id: forecast[0]._id.MapCodeId
					}).select({ MapCodeText: 1, _id: 0 });

					const areas = await Area.find({
						Id: forecast[0]._id.AreaTypeCodeId
					}).select({ AreaTypeCodeText: 1, _id: 0 });

					z.resolutiontext = resolutions[0].ResolutionCodeText;
					z.maptext = maps[0].MapCodeText;
					z.areatext = areas[0].AreaTypeCodeText;

					j = 0;
					while (j < snt.length) {
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
							'DayAheadTotalLoadForecastByMonthValue'
						];

						const opts = { fields };

						try {
							// Create a parser with the given titles
							const parser = new Parser(opts);
							// Convert actualData to csv
							const csv = parser.parse(snt);

							console.log('csv');
							res.send(csv);
						} catch (err) {
							console.error('There was an error converting data to csv');
							console.error(err);
						}
					} else if (req.query.format === 'json') {
						// if format is json, just send snt
						res.send(snt);
					} else if (!req.query.format) {
						//if no format the just send snt
						res.send(snt);
					} else {
						// if format is someting else, throw error 400
						res.send('Wrong!');
					}
				} catch (err) {
					res.status(403).send('No data');
				}
			} catch (err) {
				res.status(400).send('Error', err);
			}
		}
	}
);

module.exports = router;
