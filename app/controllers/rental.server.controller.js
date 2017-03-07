var http = require('http');
var cheerio = require('cheerio');
var cfg = require('../../config/config')

/*url存储对象*/
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

/*url读取解析对象*/
let rentalInfosObj = (function(){
	/*二手房解析出来的数据存储在该map中*/
	let rentalInfosMap = new Map();

	let szUrlPipe = [];/*管道数组，将得到url压入，由定时器按时读取访问解析。*/

	let iNum = 0;
	(function func(){
		iNum++;

		/*反爬虫策略：1-10s随机访问，每8次休息一次，休息时间为3-9分钟随机*/
		if (iNum > 8) {
			setTimeout(func,10000 * (1+Math.random()));
			if (iNum === 40) {
				iNum = 0;
			};
		}
		else{
			if (szUrlPipe.length) {
				analysis(szUrlPipe.shift());
			};
			setTimeout(func,10000 * Math.random());
		}
	})();
	

	/*根据url访问并解析返回值*/
	function analysis(url){
		let html = '';
		http.get(url, function(res){
			res.on('data', function(chuck){
				html += chuck;
			})

			res.on('end', function(){
				let $ = cheerio.load(html);
				try{
					
					$('a.c_333') && $('a.c_333')['0'] 
					&& rentalInfosMap.set(url, {
						tel: $('span.tel-num.tel-font').text(),
						price: $('.house-price').text(),
						location: $('a.c_333')[0].children[0].data,
						img: $('#smainPic')['0'].attribs.src,
					})

					console.log('get '+Array.from(rentalInfosMap).length+' rental infos');
				}
				catch(e){
					console.log('get rental infos or rentalInfosMap set error!');
				}
			})
		})
	}

	return {
		push(url){
			szUrlPipe.push(url);
		},
		getRentalInfos(){
			let params = {};
	
			for(let [k,v] of rentalInfosMap){
				params[k] = v;
			}

			return params;
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
				for(let i = 0; i < $('div.des > h2 > a').length; i++){
					rentalObj.add($('div.des > h2 > a')[i].attribs.href)
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
function getRentalInfosByUrl(url){
	rentalInfosObj.push(url);
}



module.exports = {
	init(){
		updateRentalUrl();	
		rentalObj.register(getRentalInfosByUrl);
	},

	getRentalInfos(req, res, next){
		let params = rentalInfosObj.getRentalInfos();
		console.log('params',params)
		res.json({result: true,params});
	}
}
