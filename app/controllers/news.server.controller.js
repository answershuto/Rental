var mongoose = require('mongoose');
var News = mongoose.model('news');

module.exports = {
	create: function(req, res, next){

		var news = new News({
			title: "bbb",
			content: "content bbb"
		});
		
		news.save(function(err){
			if (err) {
				return next(err);
			};

			res.json(news);
		});

		//res.send('create!\n');
	},
	find: function(req,res,next){
		News.find({},function(err,doc){
			if (err) {
				return next(err);
			};

			res.json(doc);
		})
	}
}
