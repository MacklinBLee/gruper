// Get all of our event data
var data = require('../data.json');

var newEvent; // event information stored in JSON
var newID = "empty"; // unique ID for event
var host_usrname // username of current user
var repeatFlag = false;
exports.view = function(req, res){	
	var price = "FREE";
	if(req.query.price != ""){
		price = req.query.price;
	}

	// Unique ID for the event
	if(typeof req.query.title!= 'undefined' && typeof req.query.date1!= 'undefined' && typeof req.query.location!= 'undefined')
		newID = req.query.title+'&'+req.query.location;
	
	// Find current user and get username to make them host of event
	for(var i = 0; i < data.logindata.length; i++){
		if(data.logindata[i].currentusr == 1){
			// Holds the username for the current user
			host_usrname = data.logindata[i].username;
		
			// Automatically join the event that you create
			if(newID !== null && newID != "empty") {
				for(var j = 0; j < data.logindata[i].joined_events.length; j++){
					console.log(repeatFlag);
					if(data.logindata[i].joined_events[j].id == newID){
						repeatFlag = true;
						break;
					}
			}
				
			// No repeat IDs added to JSON array joined_events
			console.log(repeatFlag);
			if(!repeatFlag)	{			
				data.logindata[i].joined_events.push({"id":newID});
			}

			break;
			}
		}
	}
	
	// reset value of flag
	repeatFlag = false;


	newEvent= {"title": req.query.title,
			"date1": req.query.date1,
			"hrs1": req.query.hrs1,
			"minute1": req.query.minute1,
			"ampm1": req.query.ampm1,
			"date2": req.query.date2,
			"hrs2": req.query.hrs2,
			"minute2": req.query.minute2,
			"ampm2": req.query.ampm2,
			"price": price,
			"location": req.query.location,
			"description": req.query.description,
			"capacity": req.query.capacity,
			"lat": req.query.hiddenlat,
			"lng": req.query.hiddenlng,
			"id": newID,
			"host": host_usrname
	}

	// reset 
	newID = "empty";

		
	// Event with same ID cannot get created
	var isRepeat = false;
	for(var i = 0; i < data.events.length; i++){
		if(newID == data.events[i].id && newID != "empty"){
			console.log(newID);
			console.log(data.events[i].id);
			isRepeat = true;
		}
	}
	
	console.log(req.query.title);
	console.log(isRepeat);
	if(req.query.title != null && !isRepeat){
		data["events"].push(newEvent);
	}
	
	var nameRepeat = false;
	//If making a new user account, push them
	if(req.query.email != null){
		var newUser= {"username": req.query.username,
			"password": req.query.password,
			"linkhref":"login",
			"currentusr":"1",
			"joined_events":[]
		}
		// do not push if same user exists
		for(var i = 0; i < data.logindata.length; i++){
				if(req.query.username == data.logindata[i].username){
					nameRepeat = true;
				}
		console.log(nameRepeat);
		}
		
		if (!nameRepeat) {
			data["logindata"].push(newUser);
		} 
	}
	else if(req.query.password != null){
		for(var j = 0; j < data.logindata.length; j++){
			if(data.logindata[j].username == req.query.username && data.logindata[j].password == req.query.password){
				data.logindata[j].currentusr = "1";
			}
		}
	}

	console.log(data);

	//res.render('index', data);
	var random_num = Math.random();
	console.log(random_num);

	if (random_num >= 0.0) {
	  data['alt'] = false;
	  res.render('index', data);
	} else {
	  res.redirect('/alt');
	}




};

exports.viewAlt = function(req, res){
	data["alt"] = true;
  	res.render('index', data);
}; 