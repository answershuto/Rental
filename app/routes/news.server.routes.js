var NewsController = require('../controllers/news.server.controller');

module.exports = function(app){
	app.route('/')
		.get(function(req,res,next){
			/*require('fs').readFile(__dirname+'/../../index.html', function (err, html) {
				console.log(__dirname)
				if (err) {  
			        throw err;   
			    } 

			    res.writeHeader(200, {"Content-Type": "text/html"});    
		        res.write(html);    
		        res.end();  
			})*/

			res.render('index.html');
		});
	app.route('/news/create')
		.get(NewsController.create)
		.post(NewsController.create);

	app.route('/news/find')
		.all(NewsController.find);
}