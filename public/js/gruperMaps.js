//AIP KEY: AIzaSyD8CaEXps9YVVP7RHVS8LvF6K7XaQi4vs4
//var data = require('../data.json');

function initMap() {
			//console.log(JSON.parse(data["events"]));
	
	
		    var latLongTemp = {lat: 32.881263, lng: -117.237547};
			
	        var mapDiv = document.getElementById('map');
	        var map = new google.maps.Map(mapDiv, {
	          center: {lat: 32.881263, lng: -117.237547},
	          zoom: 12
	        });
			
			var infoWindow = new google.maps.InfoWindow();
			
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
			
			var markerTemp = new google.maps.Marker({
				map: map,
				position: latLongTemp,
				title: 'gruper Meeting'
			});
			
			google.maps.event.addListener(markerTemp, 'click', function() {
				infoWindow.setContent('<div><strong>' + "gruper Meeting" + '</strong><br>' +
				"2/2/2016 at 2pm" + '<br>' +
				"Free" + '</div>' + '<a href="/view"><input type="submit" value="View"></a>');
				infoWindow.open(map, this);
			});
	      }
		  
		  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
		  }