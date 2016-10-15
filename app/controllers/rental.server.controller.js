var mongoose = require('mongoose');
var http = require('http');
var cheerio = require('cheerio');

function getUrl(page = 1){
	return  'http://hz.58.com/chuzu/pn'+page+'/?key=%E6%9D%AD%E5%B7%9E%E7%A7%9F%E6%88%BF%E5%AD%90&cmcskey=%E7%A7%9F%E6%88%BF%E5%AD%90&final=1&PGTID=0d3090a7-0004-f43c-ee04-95c2ea3d031f&ClickID=6';
}

module.exports = {
	init: function(){
		var html = '';

		http.get(getUrl(1), function(res){
			res.on('data', function(chuck){
				html += chuck;
			})

			res.on('end', function(){
				var $ = cheerio.load(html);
				var arrRentals = $('.tbimg')[0];
				for(var i = 0; i < $('a.t').length; i++){
					console.log($('a.t')[i].attribs.href)
				}
			})
		})
	}
}
