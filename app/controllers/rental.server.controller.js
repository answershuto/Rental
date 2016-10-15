var mongoose = require('mongoose');
var http = require('http');
var cheerio = require('cheerio');
var cfg = require('../../config/config')

let rentalSet = new Set();

/***********************************************************************************************
*函数名 getUrl
*函数功能描述 ：根据第几页获取url
*函数参数 ：page：页码
*函数返回值 ：url
***********************************************************************************************/
function getUrl(page = 1){
	return  'http://hz.58.com/chuzu/pn'+page+'/?key=%E6%9D%AD%E5%B7%9E%E7%A7%9F%E6%88%BF%E5%AD%90&cmcskey=%E7%A7%9F%E6%88%BF%E5%AD%90&final=1&PGTID=0d3090a7-0004-f43c-ee04-95c2ea3d031f&ClickID=6';
}

/***********************************************************************************************
*函数名 ：updateRentalInfo
*函数功能描述 ：从58网站上更新租房信息
*函数参数 ：无
*函数返回值 ：无
***********************************************************************************************/
function updateRentalInfo(){
	for(let page=1;page<=cfg.page;page++){
		let html = '';
		http.get(getUrl(page), function(res){
			res.on('data', function(chuck){
				html += chuck;
			})

			res.on('end', function(){
				let $ = cheerio.load(html);
				let arrRentals = $('.tbimg')[0];
				for(let i = 0; i < $('a.t').length; i++){
					rentalSet.add($('a.t')[i].attribs.href)
				}
			})
		})
	}
}

module.exports = {
	init(){
		updateRentalInfo();		
	}
}
