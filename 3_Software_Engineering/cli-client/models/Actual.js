const mongoose = require('mongoose');

const actualSchema = new mongoose.Schema({
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
	TotalLoadValue: Number,
	AreaTypeCodeId: Number,
	AreaCodeId: Number,
	ResolutionCodeId: Number,
	MapCodeId: Number,
	RowHash: String
});

const Actual = mongoose.model(
	'ActualTotalLoad',
	actualSchema,
	'ActualTotalLoad'
);

module.exports = Actual;
