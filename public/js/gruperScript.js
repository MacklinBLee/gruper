'use strict';

// Title of event current user wants to unjoin
var event_title = "";

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$(".info").toggle();

	// displays created and joined events
	$.get("/data", displayEvents);

	// Clicking unjoin button will delete ID from current user
	$('.events_joined').on('click', '.unjoin_button' , function() {
	event_title = $(this).closest('.panel');
	console.log("unjoin_this: " + event_title.text());

	$.get("/data", unjoinEvent);
	});

	// Clicking unjoin button will delete ID from current user
	$('.events_hosted').on('click', '.delete_button' , function() {
	event_title = $(this).closest('.panel');
	console.log("delete_this: " + event_title.text());

	$.get("/data", deleteEvent);
	});	

	// Google Analytics when joined events button is clicked
	$('#loginbuttons').on('click', '#viewEvent' , function() {
		// Send an analytics event when button "Events you've Created/Joined is clicked"
		ga("send", "event", "viewEvent", "click");		
	});

	// Google Analytics when joined events button is clicked
	$('#loginbuttonsalt').on('click', '#viewEvent' , function() {
		// Send an analytics event when button "Create New Event" is clicked
		ga("send", "event", "viewEvent", "click");		
	});
});


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	var dataURL = "/data";
	$.get(dataURL, changeLoginData);
    $("#submit_button").click(submit_btn);
	$("a.thumbnail").click(eventClick);
}

/*
 * Function that displays the events the user has created followed by the events the user has joined
 */
function displayEvents(result) {
	console.log(result);
	// display the events that the current user is hosting
	// Finds the current user
	var user;
	// Find User information
	var user_info = "";
	console.log("He");
	for(var i = 0; i < result.logindata.length; i++){
		if(result.logindata[i].currentusr == "1"){
			user_info = result.logindata[i]
			console.log(result.logindata[i].username);
			break;
		}
	}
	// current user name
	if (user_info != "") {
		user = user_info.username;
	
	console.log(user);
	for(var i = 0; i < user_info.joined_events.length; i++){
		for(var j = 0; j < result.events.length; j++){
			// Find events that the current user is the host of 
			if(user_info.joined_events[i].id == result.events[j].id && user == result.events[j].host){
				$(".events_hosted").append('<div class="panel panel-info"><div class="panel-heading"><div class="row"><div class="col-xs-6">' + '<a href="/view/' + result.events[j].lat + '&' + result.events[j].lng + '">' + result.events[j].title + '</a></div>' + '<div class="col-xs-2">' + '<div class="col-xs-2"><input class="btn btn-danger delete_button" type="button" value="delete" onclick="window.location.reload()"/></div>' + '</div>'+ '</div></div>');
			}

			// Find events that the current user has joined and is not the host of
			else if(user_info.joined_events[i].id == result.events[j].id){
				$(".events_joined").append('<div class="panel panel-info"><div class="panel-heading"><div class="row"><div class="col-xs-6 unjoin_this">' + '<a href="/view/' + result.events[j].lat + '&' + result.events[j].lng + '">' + result.events[j].title + '</a>'  + '</div>' + '<div class="col-xs-2"><input type="button" value="unjoin" class="btn btn-warning unjoin_button" onclick="window.location.reload()"/></div>' +
				 	'</div>'+ '</div></div>');
			}
		}
	}
	}
}

function changeLoginData(result){
	console.log(result);
	var resultFound = false;
	for(var i = 1; i < result.logindata.length; i++){
		if(result.logindata[i].currentusr == "1"){
			document.getElementById("username").innerHTML = result.logindata[i].username + " (Logout)";

			$('#loginbuttonsalt').html('<a href="/create"> <button id="newEvent" type="button" class="btn btn-info btn-large">Create New Event</button></a> <a href="/joined">&nbsp <button id="viewEvent" type="button" class="btn btn-info btn-large">Events You&#39ve Joined</button></a>');
			$('#loginbuttons').html('<a href="/create"> <button id="newEvent" type="button" class="btn btn-info btn-large">Create New Event</button></a> <a href="/joined"> </br> </br> <button id="viewEvent" type="button" class="btn btn-info btn-large">Events You&#39ve Created/Joined</button></a>');
			
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
	console.log("TOGGLING");
	

}

function submit_btn(result) {
	console.log("Clicked search button: " + result);
}

function unjoinEvent(result){
	console.log("clicked unjoin: " + event_title.text());

	for(var i = 0; i < result["logindata"].length; i++){
		// if current user then assign to curr
		if(result["logindata"][i].currentusr == "1"){
			for(var j = 0; j < result["events"].length; j++){
				if(event_title.text() == result["events"][j].title){ 
					$.post('/joined', { 'id': result["events"][j].id, 'user':result["logindata"][i].username });
				}
			}
		}
	}
}

function deleteEvent(result){
	console.log("clicked delete: " + event_title.text());

	for(var i = 0; i < result["logindata"].length; i++){
		// if current user then assign to curr
		if(result["logindata"][i].currentusr == "1"){
			for(var j = 0; j < result["events"].length; j++){
				if(event_title.text() == result["events"][j].title){ 
					$.post('/joined', { 'del_id': result["events"][j].id, 'user':result["logindata"][i].username });
					break;
				}
			}
		}
	}
}