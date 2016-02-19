//AIP KEY: AIzaSyD8CaEXps9YVVP7RHVS8LvF6K7XaQi4vs4

var map;
var infoWindow;
var eventsArray = [];
var currentEvent = 0;
var markerArray = [];
var mIndex = 0;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
var numTodayDate = mm*30 + dd;
console.log(mm);
console.log(dd);
console.log(numTodayDate);
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
	currentEvent = 0;
	for(var i = 0; i < result.events.length; i++){
		'use strict';
		var event = result.events[i];
		createEventMarker(map, infoWindow, event.title, event.date1, event.hrs1, event.minute1, event.ampm1, event.price, event.lat, event.lng);
	}
}

// Function that is called when submit button of search is clicked
// It sets all markers on the map to 0 and deletes them
function submit_btn(e){
	console.log("Submit button clicked");
	eventsArray = [];
	for(var i = 0; i < markerArray.length; i++){
		markerArray[i].setMap(null);
	}
    mIndex = 0;
    markerArray = [];
	$.get("/jsonevents", submitCallback);
}

// Data from JSON is accessed when the submit button of search is called.
// This function also implements search. If a substring of the title is found
// it shows the corresponding events
function submitCallback(result){
	currentEvent = 0;
	for(var i = 0; i < result.events.length; i++){
		'use strict';
		var event = result.events[i];
		var dateArray = event.date1.split("/");
		console.log(dateArray)
		var searchTitle = event.title.toLowerCase();
		var searchSubs = document.getElementById("searchStr").value.toLowerCase();
		var searchPos = searchTitle.search(searchSubs);
		var eventDate = new Date(dateArray[0],dateArray[1],dateArray[2]);
		var numEventDate = parseInt(dateArray[0])*30 + parseInt(dateArray[1]);
        var diffDate = numEventDate - numTodayDate;
		var endDate = $("#timeValue").val();
		
		if((searchPos>=0)&(diffDate>=0)&(diffDate<=endDate)){
			createEventMarker(map, infoWindow, event.title, event.date1, event.hrs1, event.minute1, event.ampm1, event.price, event.lat, event.lng);
	    }
    }
}
  
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(browserHasGeolocation ?
				'Error: The Geolocation service failed.' :
				'Error: Your browser doesn\'t support geolocation.');
}

function createEventMarker(map, infoWindow, title, date1, hrs1, minute1, ampm1, price, lat, lng){
	
	 markerArray[mIndex] = new google.maps.Marker({
		map: map,
		position: {lat: parseFloat(lat), lng: parseFloat(lng)},
		title: title
	});

    // Keep the first event always open to improve interaction flow for the user
	if(mIndex==0){
		infoWindow.setContent('<div><strong>' + title + '</strong><br>' +
		date1 + " at " + hrs1 + ":" + minute1 + ampm1 + '<br>' +
		price + '</div>' + '<a href="/view"><input type="submit" value="View"></a>');
        infoWindow.open(map, markerArray[0]);
	}
	
	google.maps.event.addListener(markerArray[mIndex], 'click', function() {
		infoWindow.setContent('<div><strong>' + title + '</strong><br>' +
		date1 + " at " + hrs1 + ":" + minute1 + ampm1 + '<br>' +
		price + '</div>' + '<a href="/view"><input type="submit" value="View"></a>');
		infoWindow.open(map, this);
	});

	mIndex++;
}


