//AIP KEY: AIzaSyD8CaEXps9YVVP7RHVS8LvF6K7XaQi4vs4

var map;
var infoWindow;
var eventsArray = [];
var currentEvent = 0;

function initMap() {
	'use strict';
	$.get("/jsonevents", callback);
	
    var mapDiv = document.getElementById('map');
    map = new google.maps.Map(mapDiv, {
      center: {lat: 32.881263, lng: -117.237547},
      zoom: 12
    });
			
	infoWindow = new google.maps.InfoWindow();
			
	// Try HTML5 geolocation.
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
		var pos = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};

		map.setCenter(pos);
	}, function() {
		handleLocationError(true, infoWindow, map.getCenter());
	});
	} else {
		// Browser doesn't support Geolocation
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

function callback(result){
	for(var i = 0; i < result.events.length; i++){
		'use strict';
		$.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.events[i].location +"&key=AIzaSyD8CaEXps9YVVP7RHVS8LvF6K7XaQi4vs4", latLongCallback);
		var event = result.events[i];
		eventsArray.push({title: event.title, date1: event.date1, hrs1:event.hrs1, minute1:event.minute1, ampm1:event.ampm1, price:event.price});
	}
}

function latLongCallback(result){
	var event = eventsArray[currentEvent];
	currentEvent++;
	
	createEventMarker(map, infoWindow, event.title, event.date1, event.hrs1, event.minute1, event.ampm1, event.price, result.results[0].geometry.location);
}
  
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
				'Error: The Geolocation service failed.' :
				'Error: Your browser doesn\'t support geolocation.');
}

function createEventMarker(map, infoWindow, title, date1, hrs1, minute1, ampm1, price, latLong){
	
	var markerTemp = new google.maps.Marker({
		map: map,
		position: latLong,
		title: title
	});
	
	google.maps.event.addListener(markerTemp, 'click', function() {
		infoWindow.setContent('<div><strong>' + title + '</strong><br>' +
		date1 + " at " + hrs1 + ":" + minute1 + ampm1 + '<br>' +
		price + '</div>' + '<a href="/view"><input type="submit" value="View"></a>');
		infoWindow.open(map, this);
	});
}