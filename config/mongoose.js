var config = require('./config')

module.exports = function(){

	require('../app/models/rental.server.model.js');

	return db;
}