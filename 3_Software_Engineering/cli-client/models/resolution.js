const mongoose = require('mongoose');


const resolutionSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	ResolutionCodeText: String,
	ResolutionCodeNote: String
});


module.exports = mongoose.model('Resolution',resolutionSchema);