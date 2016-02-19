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
	
	setDefaultDate();
}

function setDefaultDate(){
	var today = new Date();
	var dateString = (today.getMonth()+1) + "/" + today.getDate() + "/"+ today.getFullYear();
	$("#datepicker1").val(dateString);
}