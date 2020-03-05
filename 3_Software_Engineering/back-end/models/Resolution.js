const mongoose = require('mongoose');

const resolutionSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	ResolutionCodeText: String,
	ResolutionCodeNote: String
});

const Resolution = mongoose.model(
	'ResolutionCode',
	resolutionSchema,
	'ResolutionCode'
);

module.exports = Resolution;
