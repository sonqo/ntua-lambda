const express = require('express');
const router = express.Router();

const { Parser } = require('json2csv');

const Map = require('../models/Map');
const Area = require('../models/Area');
const Resolution = require('../models/Resolution');
const Production = require('../models/Generation');
const authFunction = require('../validation/auth');
const ProductionType = require('../models/ProductionType');

const resonums = ['0', '1', '2', '3', '4', '5', '6', '7', '8'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const ptypes = [
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'11',
	'12',
	'13',
	'14',
	'15',
	'16',
	'17',
	'18',
	'19',
	'20',
	'21',
	'22',
	'23',
	'24'
];

router.get(
	'/:AreaName/:Production/:Resolution/date/:date',
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
		} else if (
			req.params.Production === ' ' ||
			(!(req.params.Production === 'AllTypes') &&
				!(req.params.Production in ptypes))
		) {
			res.status(400).send('No proper production !');
		} else {
			var paramData = {
				areaName: req.params.AreaName,
				resolution: parseInt(req.params.Resolution),
				areatypeCode: '',
				mapCode: '',
				year: parseInt(req.params.date.substring(0, 4)),
				month: parseInt(req.params.date.substring(5, 7)),
				day: parseInt(req.params.date.substring(8, 10)),
				productionType: req.params.Production
			};

			var snt = [];

			// Data template that will be returned from the request
			var actualData = {
				Source: 'entso-e',
				Dataset: 'AggregatedGenerationPerType',
				AreaName: paramData.areaName,
				AreaTypeCode: '',
				MapCode: '',
				ResolutionCode: '',
				Year: paramData.year,
				Month: paramData.month,
				Day: paramData.day,
				DateTimeUTC: '',
				ProductionType: '',
				ActualGenerationOutputValue: '',
				UpdateTimeUTC: ''
			};

			var z = {
				maptext: '',
				resolutiontext: '',
				areatext: '',
				productiontext: ''
			};

			try {
				let production = [];
				if (paramData.productionType === 'AllTypes') {
					production = await Production.find({
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
							ActualGenerationOutput: 1,
							AreaTypeCodeId: 1,
							ResolutionCodeId: 1,
							MapCodeId: 1,
							ProductionTypeId: 1,
							_id: 0
						})
						.sort({ DateTime: 1 });
				} else {
					production = await Production.find({
						AreaName: paramData.areaName,
						Year: paramData.year,
						Month: paramData.month,
						Day: paramData.day,
						ResolutionCodeId: paramData.resolution,
						ProductionTypeId: parseInt(paramData.productionType)
					})
						.select({
							DateTime: 1,
							AreaName: 1,
							UpdateTime: 1,
							ActualGenerationOutput: 1,
							AreaTypeCodeId: 1,
							ResolutionCodeId: 1,
							MapCodeId: 1,
							ProductionTypeId: 1,
							_id: 0
						})
						.sort({ DateTime: 1 });
				}

				var j = 0;
				while (j < production.length) {
					snt.push(JSON.parse(JSON.stringify(actualData)));
					j = j + 1;
				}

				var i = 0;
				while (i < production.length) {
					snt[i].DateTimeUTC = production[i].DateTime;
					snt[i].ActualGenerationOutputValue =
						production[i].ActualGenerationOutput;
					snt[i].UpdateTimeUTC = production[i].UpdateTime;
					i = i + 1;
				}

				try {
					const resolutions = await Resolution.find({
						Id: production[0].ResolutionCodeId
					}).select({ ResolutionCodeText: 1, _id: 0 });

					const maps = await Map.find({ Id: production[0].MapCodeId }).select({
						MapCodeText: 1,
						_id: 0
					});

					const areas = await Area.find({
						Id: production[0].AreaTypeCodeId
					}).select({ AreaTypeCodeText: 1, _id: 0 });

					const productions = await ProductionType.find({
						Id: production[0].ProductionTypeId
					}).select({ ProductionTypeText: 1, _id: 0 });

					z.resolutiontext = resolutions[0].ResolutionCodeText;
					z.maptext = maps[0].MapCodeText;
					z.areatext = areas[0].AreaTypeCodeText;
					z.productiontext = productions[0].ProductionTypeText;

					j = 0;
					while (j < snt.length) {
						snt[j].AreaTypeCode = z.areatext;
						snt[j].MapCode = z.maptext;
						snt[j].ResolutionCode = z.resolutiontext;
						snt[j].ProductionType = z.productiontext;
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
							'ProductionType',
							'ActualGenerationOutputValue',
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
				res.status(403).send('error');
			}
		}
	}
);

router.get(
	'/:AreaName/:Production/:Resolution/month/:date',
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
			!(req.params.Resolution in resonums)
		) {
			res.status(400).send('No proper resolution !');
		} else if (
			req.params.Production === ' ' ||
			(!(req.params.Production === 'AllTypes') &&
				!(req.params.Production in ptypes))
		) {
			res.status(400).send('No proper production !');
		} else {
			var paramData = {
				areaName: req.params.AreaName,
				resolution: parseInt(req.params.Resolution),
				areatypeCode: '',
				mapCode: '',
				year: parseInt(req.params.date.substring(0, 4)),
				month: parseInt(req.params.date.substring(5, 7)),
				day: '',
				productionType: req.params.Production
			};

			var snt = [];

			// Data template that will be returned from the request
			var actualData = {
				Source: 'entso-e',
				Dataset: 'AggregatedGenerationPerType',
				AreaName: paramData.areaName,
				AreaTypeCode: '',
				MapCode: '',
				ResolutionCode: '',
				Year: paramData.year,
				Month: paramData.month,
				Day: '',
				ProductionType: '',
				ActualGenerationOutputByDayValue: ''
			};

			var z = {
				maptext: '',
				resolutiontext: '',
				areatext: '',
				productiontext: ''
			};

			try {
				production = [];
				if (!(paramData.productionType === 'AllTypes')) {
					production = await Production.aggregate([
						{
							$match: {
								AreaName: paramData.areaName,
								Year: paramData.year,
								Month: paramData.month,
								ResolutionCodeId: paramData.resolution,
								ProductionTypeId: parseInt(paramData.productionType)
							}
						},
						{
							$group: {
								_id: {
									Day: '$Day',
									ResolutionCodeId: '$ResolutionCodeId',
									MapCodeId: '$MapCodeId',
									AreaTypeCodeId: '$AreaTypeCodeId',
									ProductionTypeId: '$ProductionTypeId'
								},
								count: { $sum: '$ActualGenerationOutput' }
							}
						},
						{ $sort: { '_id.Day': 1 } }
					]);
				} else {
					production = await Production.aggregate([
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
									ProductionTypeId: '$ProductionTypeId',
									Day: '$Day',
									ResolutionCodeId: '$ResolutionCodeId',
									MapCodeId: '$MapCodeId',
									AreaTypeCodeId: '$AreaTypeCodeId',
									ActualGenerationOutput: '$ActualGenerationOutput'
								}
							}
						},
						{
							$group: {
								_id: {
									Day: '$_id.Day',
									ResolutionCodeId: '$_id.ResolutionCodeId',
									MapCodeId: '$_id.MapCodeId',
									AreaTypeCodeId: '$_id.AreaTypeCodeId',
									ProductionTypeId: '$_id.ProductionTypeId'
								},
								count: { $sum: '$_id.ActualGenerationOutput' }
							}
						},
						{ $sort: { '_id.Day': 1, '_id.ProductionTypeId': 1 } }
					]);
				}
				// console.log(production);
				var j = 0;
				while (j < production.length) {
					snt.push(JSON.parse(JSON.stringify(actualData)));
					j = j + 1;
				}

				var i = 0;
				while (i < production.length) {
					snt[i].Day = production[i]._id.Day;
					snt[i].ActualGenerationOutputByDayValue = production[i].count;
					i = i + 1;
				}

				try {
					const resolutions = await Resolution.find({
						Id: production[0]._id.ResolutionCodeId
					}).select({ ResolutionCodeText: 1, _id: 0 });

					const maps = await Map.find({
						Id: production[0]._id.MapCodeId
					}).select({ MapCodeText: 1, _id: 0 });

					const areas = await Area.find({
						Id: production[0]._id.AreaTypeCodeId
					}).select({ AreaTypeCodeText: 1, _id: 0 });

					let productions = [];
					for (let i = 0; i < snt.length; i++) {
						productions[i] = await ProductionType.find({
							Id: production[i]._id.ProductionTypeId
						}).select({ ProductionTypeText: 1, _id: 0 });
					}

					j = 0;
					while (j < snt.length) {
						snt[j].AreaTypeCode = areas[0].AreaTypeCodeText;
						snt[j].MapCode = maps[0].MapCodeText;
						snt[j].ResolutionCode = resolutions[0].ResolutionCodeText;
						snt[j].ProductionType = productions[j][0].ProductionTypeText;
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
							'ProductionType',
							'ActualGenerationOutputByDayValue'
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
				res.status(400).send('Error');
			}
		}
	}
);

router.get(
	'/:AreaName/:Production/:Resolution/year/:date',
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
			!(req.params.Resolution in resonums)
		) {
			res.status(400).send('No proper resolution !');
		} else if (
			req.params.Production === ' ' ||
			(!(req.params.Production === 'AllTypes') &&
				!(req.params.Production in ptypes))
		) {
			res.status(400).send('No proper production !');
		} else {
			var paramData = {
				areaName: req.params.AreaName,
				resolution: parseInt(req.params.Resolution),
				areatypeCode: '',
				mapCode: '',
				year: parseInt(req.params.date.substring(0, 4)),
				month: '',
				day: '',
				productionType: req.params.Production
			};

			var snt = [];

			// Data template that will be returned from the request
			var actualData = {
				Source: 'entso-e',
				Dataset: 'AggregatedGenerationPerType',
				AreaName: paramData.areaName,
				AreaTypeCode: '',
				MapCode: '',
				ResolutionCode: '',
				Year: paramData.year,
				Month: '',
				ProductionType: '',
				ActualGenerationOutputByMonthValue: ''
			};

			var z = {
				maptext: '',
				resolutiontext: '',
				areatext: '',
				productiontext: ''
			};

			try {
				production = [];
				if (!(paramData.productionType === 'AllTypes')) {
					production = await Production.aggregate([
						{
							$match: {
								AreaName: paramData.areaName,
								Year: paramData.year,
								ResolutionCodeId: paramData.resolution,
								ProductionTypeId: parseInt(paramData.productionType)
							}
						},
						{
							$group: {
								_id: {
									Month: '$Month',
									ResolutionCodeId: '$ResolutionCodeId',
									MapCodeId: '$MapCodeId',
									AreaTypeCodeId: '$AreaTypeCodeId',
									ProductionTypeId: '$ProductionTypeId'
								},
								count: { $sum: '$ActualGenerationOutput' }
							}
						},
						{ $sort: { '_id.Month': 1 } }
					]);
				} else {
					production = await Production.aggregate([
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
									ProductionTypeId: '$ProductionTypeId',
									Month: '$Month',
									ResolutionCodeId: '$ResolutionCodeId',
									MapCodeId: '$MapCodeId',
									AreaTypeCodeId: '$AreaTypeCodeId',
									ActualGenerationOutput: '$ActualGenerationOutput'
								}
							}
						},
						{
							$group: {
								_id: {
									Month: '$_id.Month',
									ResolutionCodeId: '$_id.ResolutionCodeId',
									MapCodeId: '$_id.MapCodeId',
									AreaTypeCodeId: '$_id.AreaTypeCodeId',
									ProductionTypeId: '$_id.ProductionTypeId'
								},
								count: { $sum: '$_id.ActualGenerationOutput' }
							}
						},
						{ $sort: { '_id.Month': 1, '_id.ProductionTypeId': 1 } }
					]);
				}
				var j = 0;
				while (j < production.length) {
					snt.push(JSON.parse(JSON.stringify(actualData)));
					j = j + 1;
				}

				var i = 0;
				while (i < production.length) {
					snt[i].Month = production[i]._id.Month;
					snt[i].ActualGenerationOutputByMonthValue = production[i].count;
					i = i + 1;
				}

				try {
					const resolutions = await Resolution.find({
						Id: production[0]._id.ResolutionCodeId
					}).select({ ResolutionCodeText: 1, _id: 0 });

					const maps = await Map.find({
						Id: production[0]._id.MapCodeId
					}).select({ MapCodeText: 1, _id: 0 });

					const areas = await Area.find({
						Id: production[0]._id.AreaTypeCodeId
					}).select({ AreaTypeCodeText: 1, _id: 0 });

					let productions = [];
					for (let i = 0; i < snt.length; i++) {
						productions[i] = await ProductionType.find({
							Id: production[i]._id.ProductionTypeId
						}).select({ ProductionTypeText: 1, _id: 0 });
					}

					j = 0;
					while (j < snt.length) {
						snt[j].AreaTypeCode = areas[0].AreaTypeCodeText;
						snt[j].MapCode = maps[0].MapCodeText;
						snt[j].ResolutionCode = resolutions[0].ResolutionCodeText;
						snt[j].ProductionType = productions[j][0].ProductionTypeText;
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
							'ActualGenerationOutputByMonthValue'
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
				res.status(400).send('Error');
			}
		}
	}
);

module.exports = router;
