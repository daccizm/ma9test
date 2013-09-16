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
	var map;
	function initialize() {
	  var mapOptions = {
	    zoom: 16,
	    // center: new google.maps.LatLng(35.655, 139.748),
	    center: new google.maps.LatLng(34.702936, 135.497807),
	    mapTypeId: google.maps.MapTypeId.ROADMAP
	  };
	  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
	}

	google.maps.event.addDomListener(window, 'load', initialize);

	$('#location_osaka').click(function(){
		&('#hdn_lat').val('34.702936');
		&('#hdn_lng').val('135.497807');
	})

	$('#location_matsue').click(function(){
		&('#hdn_lat').val('35.465532');
		&('#hdn_lng').val('133.060246');
	})

})