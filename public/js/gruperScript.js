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
	console.log("Javascript connected!");
	$("a.thumbnail").click(eventClick);
	var dataURL = "/data";
	$.get(dataURL, changeLoginData);
}

// Function that adds JSON information on events when title is clicked
function eventClick(e) {
	// Cancel the default action, which prevents the page from reloading
	e.preventDefault();
    // In an event listener, $(this) is the element that fired the event    
 	var eventClicked = $(this).closest(".thumbnail");
    var eventInfo = $(eventClicked).find(".info");
	$(eventInfo).toggle();
}

function changeLoginData(result){
console.log(result);
console.log("entering clicked");
    if(result.logindata[0].username == "Macklin (Logout)"){
    $('#loginbuttons').html('<a href="/create"> <button id="newEvent" type="button" class="btn btn-default">Create New Event</button></a><a href="/joined"> <button id="viewEvent" type="button" class="btn btn-default">Events You&#39ve Created/Joined</button></a>');
}
}

