const mongoose = require('mongoose');

const productionTypeSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	ProductionTypeText: String,
	ProductionTypeNote: String
});

const ProductionType = mongoose.model(
	'ProductionType',
	productionTypeSchema,
	'ProductionType'
);

module.exports = ProductionType;
