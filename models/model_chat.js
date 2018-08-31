const mongoose = require('../config/db');

var schema = mongoose.Schema({
	nick: String,
	message: String,
	time_unix: Number
});

var model = mongoose.model('message', schema);
module.exports = model;
