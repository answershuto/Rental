(function(){
	function getInfosSuc(data){
		var params = data.params
		for(var url in params){
			var localSearch = new BMap.LocalSearch(map);
			localSearch.setSearchCompleteCallback(function (searchResult) {
				var poi = searchResult.getPoi(0);/*地理位置信息*/
				var point = new BMap.Point(poi.point.lng,poi.point.lat);

				/*创建标注并加入地图*/
				var marker = new BMap.Marker(point);  
				map.addOverlay(marker);            
				marker.setAnimation(BMAP_ANIMATION_BOUNCE); /*动画跳动*/

				
		　　});
			localSearch.search(params[url].location);
		}
	}

	function getInfosErr(e){
		alert('获取数据失败');
	}

	var map = new BMap.Map("container");          // 创建地图实例  
	map.centerAndZoom("杭州", 14);
	
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