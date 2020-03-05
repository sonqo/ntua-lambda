const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	MapCodeText: String,
	MapCodeNote: String
});

const Map = mongoose.model('MapCode', mapSchema, 'MapCode');

module.exports = Map;
