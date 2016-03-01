'use strict';

var currentEventId;

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	//$(".info").toggle();
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
	$("a.thumbnail").click(eventClick);
	var dataURL = "/data";
	$.get(dataURL, changeLoginData);
	$.get(dataURL, hideJoinedEvents);
}

function changeLoginData(result){
	var resultFound = false;
	for(var i = 1; i < result.logindata.length; i++){
		if(result.logindata[i].currentusr == "1"){
			document.getElementById("username").innerHTML = result.logindata[i].username + " (Logout)";
			$('#loginbuttonsalt').html('<a href="/create"> <button id="newEvent" type="button" class="btn btn-info btn-large">Create New Event</button></a> <a href="/joined">  <button id="viewEvent" type="button" class="btn btn-info btn-large">Events You&#39ve Joined</button></a>');
			$('#loginbuttons').html('<a href="/create"> <button id="newEvent" type="button" class="btn btn-info btn-large">Create New Event</button></a> <a href="/joined"> </br> </br> <button id="viewEvent" type="button" class="btn btn-info btn-large">Events You&#39ve Created/Joined</button></a>');
			
			resultFound = true;
		}
	}
	if(!resultFound){
		document.getElementById("username").innerHTML = result.logindata[0].username;
		//Don't let guests join events
		$(".join_class").toggle();
	}
}

function hideJoinedEvents(result){
	console.log(result);
	var joined_events_temp;
	for(var i = 1; i < result.logindata.length; i++){
		if(result.logindata[i].currentusr == "1"){
			joined_events_temp = result.logindata[i].joined_events;
		}
	}
	
	var joined_events = [];
	for(var eventObj in joined_events_temp){
		joined_events.push(joined_events_temp[eventObj].id);
	}
	
	console.log(this);
	$(".thumbnail").each(function(){
		console.log(getIDFromHTML(this));
		console.log(getIDFromHTML(this)+" at "+joined_events.indexOf(getIDFromHTML(this)));
		if(joined_events.indexOf(getIDFromHTML(this)) != -1){
			console.log($(this).find(".join_class").toggle());
		}
	});
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
	currentEventId = getIDFromHTML(htmlResult);
	console.log(currentEventId);
}

function getIDFromHTML(htmlString){
	var title = $($(htmlString).find("#title")[0]).html();
	//console.log($(htmlString).find("#title"));
	var date = '&'
	var location = $($(htmlString).find("#location")[0]).html();
	return title+date+location;
}

/*
 * Add event to current user account
 */
function addEvent(result){
	console.log("HIT ID = "+currentEventId)

	// find current user
	var curr;
	for(var i = 0; i < result["logindata"].length; i++){
		// if current user then assign to curr
		if(result["logindata"][i].currentusr == "1"){
			$.post('/view/:id', { 'id': currentEventId, 'user':result["logindata"][i].username });
		}
	}
}