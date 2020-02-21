const mongoose = require('mongoose');

const mapSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	MapCodeText: String,
	MapCodeNote: String
});


module.exports = mongoose.model('Map',mapSchema);