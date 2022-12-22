const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	AreaTypeCodeText: String,
	AreaTypeCodeNote: String
});

const Area = mongoose.model('AreaTypeCode', areaSchema, 'AreaTypeCode');

module.exports = Area;
