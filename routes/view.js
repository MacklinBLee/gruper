var data = require("../data.json");

exports.view = function(req, res){

	console.log("view viewed: " + req.body.user);
	console.log("view viewed: " + req.body.id);
	
	for(var i = 0; i < data.logindata.length; i++){
		if(req.body.user == data.logindata[i].username){
			data.logindata[i].joined_events.push({'id':req.body.id});
		}
	}

	var id = req.params.id;

	for(var i = 0; i < data.events.length; i++){
		if(id == data.events[i].id){
			var title = data.events[i].title;
	    	var date1 = data.events[i].date1;
    		var hrs1 =data.events[i].hrs1;
			var minute1 = data.events[i].minute1;
			var ampm1 = data.events[i].ampm1;
			var date2 =data.events[i].date2;
    		var hrs2 =data.events[i].hrs2;
			var minute2 = data.events[i].minute2;
			var ampm2 = data.events[i].ampm2;
    		var price =data.events[i].price;
			var location =data.events[i].location;
			var description =data.events[i].description;
			var capacity = data.events[i].capacity;
			var host = data.events[i].host;
		}
	}
 
	console.log("The ID is "+id);
	
	res.render('view',{
		'eventID':id,
		'eventTitle': title,
		'eventDate1':date1,
		'eventHrs1':hrs1,
		'eventMinute1':minute1,
		'eventAmpm1':ampm1,
		'eventDate2':date2,
		'eventHrs2':hrs2,
		'eventMinute2':minute2,
		'eventAmpm2':ampm2,
		'eventPrice':price,
		'eventLocation':location,
		'eventDescription':description,
		'eventCapacity':capacity,
		'eventHost':host
	});
	//res.render('view', data);
};