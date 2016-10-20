(function(){
	function getInfosSuc(data){
		var params = data.params
		for(var url in params){
			var localSearch = new BMap.LocalSearch(map);
			localSearch.setSearchCompleteCallback(function (searchResult) {
				var poi = searchResult.getPoi(0);
				console.log(poi)
		　　});
			localSearch.search(params[url].location);
		}
	}

	function getInfosErr(e){
		alert('获取数据失败');
	}

	var map = new BMap.Map("container");          // 创建地图实例  
	map.centerAndZoom("杭州", 13);
	
	$.ajax({
		'type': 'post',
		'url': '/rental/getInfos',
		'contentType': 'application/json;charset=utf-8',
		'data': JSON.stringify({params: null}),
		success: getInfosSuc ,
		async: true,
		error: getInfosErr ,
	})

	
})();