var RentalController = require('../controllers/rental.server.controller');

module.exports = function(app){
	app.route('/')
		.get(function(req,res,next){
			res.sendFile('index.html');
		});
}