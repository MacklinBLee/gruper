'use strict';

var currentEventId;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$(".info").toggle();
	//var join_event = $('#join_this');
	$('.join_class').click(function(){		
		// AJAX request
		$.get("/data", addEvent);
	});
});

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	//document.getElementById("hiddenID").style.display = 'none';
	$("a.thumbnail").click(eventClick);
	var dataURL = "/data";
	$.get(dataURL, changeLoginData);
}

function changeLoginData(result){
	console.log(result);
	var resultFound = false;
	for(var i = 1; i < result.logindata.length; i++){
		if(result.logindata[i].currentusr == "1"){
			document.getElementById("username").innerHTML = result.logindata[i].username + " (Logout)";
			$('#loginbuttons').html('<a href="/create"> <button id="newEvent" type="button" class="btn btn-info btn-large">Create New Event</button></a> <a href="/joined">  <button id="viewEvent" type="button" class="btn btn-info btn-large">Events You&#39ve Joined</button></a>');
			
			resultFound = true;
		}
	}
	if(!resultFound){
		document.getElementById("username").innerHTML = result.logindata[0].username;
	}
}

// Function that adds JSON information on events when title is clicked
function eventClick(e) {
	// Cancel the default action, which prevents the page from reloading
	e.preventDefault();
    // In an event listener, $(this) is the element that fired the event    
 	var eventClicked = $(this).closest(".thumbnail");
    var eventInfo = $(eventClicked).find(".info");
	$(eventInfo).toggle();
	
	
	var htmlResult = eventClicked[0];
	var title = $($(htmlResult).find("#title")[0]).html();
	var date = $($(htmlResult).find("#date1")[0]).html();
	var location = $($(htmlResult).find("#location")[0]).html();
	currentEventId = title+date+location;
	console.log(title+date+location);
}

/*
 * Add event to current user account
 */
function addEvent(result){
	console.log("HIT ID = "+currentEventId);

	// find current user
	var curr;
	for(var i = 0; i < result["logindata"].length; i++){
		// if current user then assign to curr
		if(result["logindata"][i].currentusr == "1"){
			//result["logindata"][i]["joined_events"].push({"id":currentEventId});
			//console.log(result["logindata"][i]);
			$.post('/view', { 'id': currentEventId, 'user':result["logindata"][i] });
		}
	}
}