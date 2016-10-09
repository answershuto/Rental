var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	title: String,
	content: String,
	date: {type:Date,default:Date.now}
})

var News = mongoose.model('news', Schema);