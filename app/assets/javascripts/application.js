// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var gmap;
var centerLatLng;

var openInfoWindow;

/*
 * マーカーデータのセット
 */
var setMarkerData = function(makerArray) {
	for (var i = 0; i < makerArray.length; i++) {

		// マーカー作成
		var marker = new google.maps.Marker({
			position: makerArray[i].position,
			map: gmap,
			title: makerArray[i].title,
			icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld="+ (i + 1) + "|ff7e73|000000")
		});

		// マーカーのclickリスナー登録
		setMarkerClickListener(marker, makerArray[i], true);

		// マーカーの一覧出力・リンクのクリック時のイベント設定
		var link_name = "料金：";
		link_name += markerArray[i].rate;
		link_name += " ";
		link_name += markerArray[i].title;
		var link = $('<li>').append($('<a href="javascript:void(0)"/>').text(link_name));
		$('#marker_list >ol').append(link);
		setLinkClickEvent(link, marker);

		// コンビニ検索
		placeSearch();
	}
};

/*
 * マーカーのクリックイベントリスナーの登録
 */
var setMarkerClickListener = function(marker, markerData) {
	google.maps.event.addListener(marker, 'click', function(event) {
		if (openInfoWindow) {
			openInfoWindow.close();
		}
		openInfoWindow = new google.maps.InfoWindow({
			content:markerData.content
		});
		google.maps.event.addListener(openInfoWindow,'closeclick',function(){
			openInfoWindow = null;
		})
		openInfoWindow.open(marker.getMap(), marker);
	});
};

/*
 * リンクのクリックイベントの登録
 */
var setLinkClickEvent = function(link, marker){
	link.bind('click', function(){
		google.maps.event.trigger(marker, 'click');
	});
};

/*
 * コンビニ検索
 */
var placeSearch = function(keyword){
	var request = {
		//keyword: 'ローソン',
		location: centerLatLng,
		//radius: '250',
		types: ['convenience_store'],
		rankBy: google.maps.places.RankBy.DISTANCE
	};
	service = new google.maps.places.PlacesService(gmap);
	service.search(request, placeSearch_callback);
};

var placeSearch_callback = function(results, status){
	if (status == google.maps.places.PlacesServiceStatus.OK) {
		if (results.length > 0) {
			createList(results);
		}
	}
};

var createList = function(results){
	for (var i = 0; i < results.length; i++) {
		var place = results[i];
		var latlng = new google.maps.LatLng(place.geometry.location.lat(),place.geometry.location.lng());

		// マーカー作成
		var marker = new google.maps.Marker({
			position: latlng,
			map: gmap,
			title: place.name
		});
	}
};

var wathId;
var start_time;
var current_time;

$(document).ready(function(){

	function initialize() {

		start_time = new Date();

		wathId = navigator.geolocation.watchPosition(
		// navigator.geolocation.watchPosition(
			function(position){

				current_time = new Date();
				var process_time = current_time - start_time;

				// GoogleMapを読み込んでいたら終了
				// if (gmap) return;

				if(position.coords.accuracy < 300 || process_time > 15000){
					$('#hdn_lat').val(position.coords.latitude);
					$('#hdn_lng').val(position.coords.longitude);
					$('#frmGpsLatLng').trigger('submit');

					centerLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				    var mapOptions = {
				      zoom: 16,
				      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
				      mapTypeId: google.maps.MapTypeId.ROADMAP
				    };
					gmap = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

					// マーカー作成
					var marker = new google.maps.Marker({
						position: centerLatLng,
						map: gmap,
						title: "現在地",
						icon: 'https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=ski|bb|here!|FFFFFF|000000'
					});
					navigator.geolocation.clearWatch(watchId);
				}
			},
			function(error){
				var message = "地図情報が取得できませんでしorz<br/>";
				message += error.code + ":" + error.message;
				$('#map-canvas').html(message);
			},
			{enableHighAccuracy:true,timeout:1000,maximumAge:0}
		);

	}

	google.maps.event.addDomListener(window, 'load', initialize);

})