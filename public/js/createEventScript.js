'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$(".info").toggle();
});

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
		alert("Google Maps Cannot Find: " + $("#location").val());
		$("#hiddenlat").val("");
		$("#hiddenlng").val("");
	}
	else{
		$("#hiddenlat").val(result.results[0].geometry.location.lat);
		$("#hiddenlng").val(result.results[0].geometry.location.lng);
	}
	console.log($("#hiddenlat").val());
	console.log($("#hiddenlng").val());
}