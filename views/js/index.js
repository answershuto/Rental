(function(){
	var map = new BMap.Map("container");          // 创建地图实例  
	map.centerAndZoom("杭州", 13);
	
	var localSearch = new BMap.LocalSearch(map);
	var keyword = '浙江大华';
	localSearch.setSearchCompleteCallback(function (searchResult) {
		var poi = searchResult.getPoi(0);
		console.log(poi)
　　});
	localSearch.search(keyword);
})();