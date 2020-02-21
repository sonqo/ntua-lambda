const mongoose = require('mongoose');


const areaSchema = new mongoose.Schema({
	Id: Number,
	EntityCreatedAt: String,
	EntityModifiedAt: String,
	AreaTypeCodeText: String,
	AreaTypeCodeNote: String
});



module.exports = mongoose.model('Area',areaSchema);