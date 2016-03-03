'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$(".info").toggle();
});

var input = /** @type {!HTMLInputElement} */(document.getElementById('location'));
var autocomplete = new google.maps.places.Autocomplete(input);

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Create Event Script connected!");
	document.getElementById("date2").style.display = 'none';
	document.getElementById("priceDiv").style.display = 'none';
	document.getElementById("inviteDiv").style.display = 'none';
	document.getElementById("hiddenlat").style.display = 'none';
	document.getElementById("hiddenlng").style.display = 'none';
	document.getElementById("locNotFound").style.display = 'none';
	
	$("#showDate2").unbind("click").click(function(){
        $("#date2").toggle();
		$("#datepicker2").val($("#datepicker1").val());
    });
	$("#showPrice").unbind("click").click(function(){
        $("#priceDiv").toggle();
    });
	$("#showCapacity").unbind("click").click(function(){
        $("#inviteDiv").toggle();
    });
	$("#location").unbind("blur").blur(function(){
        getLatLong();
    });
	
	setDefaultDate();
}

autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);  // Why 17? Because it looks good.
    }
    marker.setIcon(/** @type {google.maps.Icon} */({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
        (place.address_components[0] && place.address_components[0].short_name || ''),
        (place.address_components[1] && place.address_components[1].short_name || ''),
        (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
});

function setDefaultDate(){
	var today = new Date();
	var dateString = (today.getMonth()+1) + "/" + today.getDate() + "/"+ today.getFullYear();
	$("#datepicker1").val(dateString);
}

function getLatLong(){
	$.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + $("#location").val() +"&key=AIzaSyD8CaEXps9YVVP7RHVS8LvF6K7XaQi4vs4", latLongCallback);
}

function latLongCallback(result){
	if(result.results[0] == null && $("#hiddenlatlng").val() != ""){
		$("#locNotFound").show();
		$("#hiddenlat").val("");
		$("#hiddenlng").val("");
	}
	else{
		$("#locNotFound").hide();
		$("#hiddenlat").val(result.results[0].geometry.location.lat);
		$("#hiddenlng").val(result.results[0].geometry.location.lng);
	}
	console.log($("#hiddenlat").val());
	console.log($("#hiddenlng").val());
}