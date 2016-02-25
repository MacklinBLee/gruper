'use strict';


// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
	$(".info").toggle();
		var join_event = $('#join_this');
		join_event.click(function(){		
			// AJAX request
			$.get("/data", addEvent);


	});
});

/*
 * Add event to current user account
 */
function addEvent(result){
	// for join function -> event information		
	var title = $('#title').text();
	var date1 = $('#date1').text();
	var hrs1 = $('#hrs1').text();
	var minute1 = $('#minute1').text();
	var ampm1 = $('#ampm1').text();
	var price = $('#price').text();
	var location = $('#location').text();
	var description = $('#description').text();
	var capacity = $('#capacity').text();
	var id = $('#id').text();
	var lat = $('#lat').text();
	var lng = $('#lng').text();

	// find current user
	var curr;
	for(var i = 0; i < result["logindata"].length; i++){
		// if current user then assign to curr
		if(result["logindata"][i].currentusr == "1")
			curr = result["logindata"][i];
	}
	console.log("curr: " + curr.username);
	// Add event that was joined to user array joined_events in JSON file
	curr["joined_events"].push({
								"title":title,
								"price":price,
								"location":location,
								"description":description,
								"capacity":capacity
								});
	console.log("joined: " + curr["joined_events"][0]["title"]);
	console.log("joined: " + curr["joined_events"][1]["title"]);
	console.log("joined: " + curr["joined_events"][2]["title"]);

	console.log("joined: " + result["logindata"][1]["joined_events"][0]["title"]);
	console.log("joined: " + result["logindata"][1]["joined_events"][1]["title"]);
	console.log("joined: " + result["logindata"][1]["joined_events"][2]["title"]);
}

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	console.log("Javascript connected!");
	$("a.thumbnail").click(eventClick);
	var dataURL = "/data";
	$.get(dataURL, changeLoginData);
	$("#submit_button").click(submit_btn);
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

function submit_btn(e){
	
}

