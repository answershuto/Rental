(function(){
	function getInfosSuc(data){
		var params = data.params;
		var szPois = [];
		for(var url in params){
			var localSearch = new BMap.LocalSearch(map);
			localSearch.setSearchCompleteCallback((function(url){
				return function (searchResult) {
					var poi = searchResult.getPoi(0);/*地理位置信息*/
					if (!poi) return;
					//console.log(poi)
					var isHasPoi = false;
					for(var i=0;i<szPois.length;i++){
						if (szPois[i].point.lng === poi.point.lng && szPois[i].point.lat === poi.point.lat) {
							isHasPoi = true;
							break;
						};
					}

					if (isHasPoi) {/*同一个小区有多套房子*/
						var point = new BMap.Point(poi.point.lng,poi.point.lat);
						szPois[i].urls.push(url)
						szPois[i].marker.addEventListener("click", (function(p){
							return function(){   
								/*点击房屋图标后弹出的信息框*/
								var opts = {
								  	width : 200,    
								  	height: 100 * p.urls.length,     
								  	title : poi.title , 
								  	enableMessage:true,
								}
								var message = "";
								p.urls.forEach(function(item,index){
									message += "<div><a href="+item+">"+item+"</a></div>"
								})
								var infoWindow = new BMap.InfoWindow(message, opts);       
								map.openInfoWindow(infoWindow,point); //开启信息窗口
							}
						})(szPois[i]));
					}
					else{
						var point = new BMap.Point(poi.point.lng,poi.point.lat);

						var myIcon = new BMap.Icon("../image/house.png", new BMap.Size(30, 30), {});      
						// 创建标注对象并添加到地图   
						var marker = new BMap.Marker(point, {icon: myIcon});    
						map.addOverlay(marker);

						marker.addEventListener("click", function(){    
							/*点击房屋图标后弹出的信息框*/
							var opts = {
							  	width : 200,    
							  	height: 100,     
							  	title : poi.title , 
							  	enableMessage:true,
							}
							var infoWindow = new BMap.InfoWindow("<a href="+url+">"+url+"</a>", opts);       
							map.openInfoWindow(infoWindow,point); //开启信息窗口
						});

						poi.marker = marker;
						poi.urls = [url];
						szPois.push(poi);
					}  

			　　}
			})(url));
			localSearch.search(params[url].location);
		}
	}

	function getInfosErr(e){
		alert('获取数据失败');
	}

	var map = new BMap.Map("container");          // 创建地图实例  
	map.centerAndZoom("杭州", 12);
	map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
	map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用

	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var mk = new BMap.Marker(r.point);
			map.addOverlay(mk);
			map.panTo(r.point);
			mk.setAnimation(BMAP_ANIMATION_BOUNCE); /*动画跳动*/
		}
		else {
			alert('failed'+this.getStatus());
		}        
	},{enableHighAccuracy: true})
	
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