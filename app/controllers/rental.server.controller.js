var mongoose = require('mongoose');
var http = require('http');
var cheerio = require('cheerio');
var cfg = require('../../config/config')

let rentalObj = (function(){
	/*保存58同城上爬取的每个租房的URL*/
	let rentalSet =  new Set();

	/*增加URL后的回调函数*/
	let callBackFunc = function(){};

	return {
		add(data){
			if (data.indexOf('hz.58.com') < 0) return;/*暂时屏蔽会跳转的URL*/
			rentalSet.add(data);
			callBackFunc && callBackFunc(data);
		},

		register(func){
			callBackFunc = func;
		},

		unRegister(){
			callBackFunc = function(){};
		}
	}
})();


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
*函数名 updateRentalUrl
*函数功能描述 ：从58网站上更新租房信息
*函数参数 ：无
*函数返回值 ：无
***********************************************************************************************/
function updateRentalUrl(){
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
					//if (i > 0) {continue;};
					rentalObj.add($('a.t')[i].attribs.href)
				}
			})
		})
	}
}

/***********************************************************************************************
*函数名 getRentalInfosByUrl
*函数功能描述 ：根据URL获取租房信息
*函数参数 ：url:每条租房信息的URL
*函数返回值 ：无
***********************************************************************************************/
function getRentalInfosByUrl(url){console.log('url',url);
	let html = '';
	http.get(url, function(res){
		res.on('data', function(chuck){
			html += chuck;
		})

		res.on('end', function(){
			let $ = cheerio.load(html);
			//console.log($('span.tel-num.tel-font').text())/*电话*/
			//console.log($('.house-price').text())/*价格*/
		
		})
	})
}



module.exports = {
	init(){
		updateRentalUrl();	
		rentalObj.register(getRentalInfosByUrl);
	}
}
