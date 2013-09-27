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

$(document).ready(function(){

	function initialize() {

		navigator.geolocation.watchPosition(
			function(position){

				// GoogleMapを読み込んでいたら終了
				if (gmap) return;

				$('#hdn_lat').val(position.coords.latitude);
				$('#hdn_lng').val(position.coords.longitude);
				$('#frmGpsLatLng').trigger('submit');

			    var mapOptions = {
			      zoom: 16,
			      center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			      mapTypeId: google.maps.MapTypeId.ROADMAP
			    };
				gmap = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
			}
		);

	}

	google.maps.event.addDomListener(window, 'load', initialize);

})