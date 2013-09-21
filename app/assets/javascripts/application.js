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

$(document).ready(function(){
	// $('#map-canvas').html();

	// $('#location_osaka').click(function(){
	// 	&('#hdn_lat').val('34.702936');
	// 	&('#hdn_lng').val('135.497807');
	// });

	// $('#location_matsue').click(function(){
	// 	&('#hdn_lat').val('35.465532');
	// 	&('#hdn_lng').val('133.060246');
	// });

	// alert(lat);

	var map;
	function initialize() {

		// func();
		// var lat = parseInt( $('#hdn_lat').val() );
		// var lng = parseInt( $('#hdn_lng').val() );

		navigator.geolocation.watchPosition(
			function(position){
				$('#hdn_lat').val(position.coords.latitude);
				$('#hdn_lng').val(position.coords.longitude);

			  var mapOptions = {
			    zoom: 16,
			    // center: new google.maps.LatLng(35.655, 139.748),
			    // center: new google.maps.LatLng(35.468059, 133.048375),
			    // center: new google.maps.LatLng($('#hdn_lat').val(), $('#hdn_lng').val()),
			    // center: new google.maps.LatLng(lat, lng),
			    center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };
			  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

			}
		);

	  // var mapOptions = {
	  //   zoom: 16,
	  //   // center: new google.maps.LatLng(35.655, 139.748),
	  //   center: new google.maps.LatLng(35.468059, 133.048375),
	  //   // center: new google.maps.LatLng($('#hdn_lat').val(), $('#hdn_lng').val()),
	  //   // center: new google.maps.LatLng(lat, lng),
	  //   mapTypeId: google.maps.MapTypeId.ROADMAP
	  // };
	  // map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

})