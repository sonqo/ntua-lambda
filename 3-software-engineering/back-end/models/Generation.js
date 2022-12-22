const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	ActionTaskID: Number,
	Status: String,
	Year: Number,
	Month: Number,
	Day: Number,
	DateTime: String,
	AreaName: String,
	UpdateTime: String,
	ActualGenerationOutput: Number,
	AreaTypeCodeId: Number,
	AreaCodeId: Number,
	ResolutionCodeId: Number,
	MapCodeId: Number,
	ProductionTypeId: Number,
	RowHash: String
});

const Production = mongoose.model(
	'AggregatedGenerationPerType',
	productionSchema,
	'AggregatedGenerationPerType'
);

module.exports = Production;
