const mongoose = require('mongoose');

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

module.exports = mongoose.model('DayAheadTotalLoadForecast',forecastSchema,'DayAheadTotalLoadForecast');