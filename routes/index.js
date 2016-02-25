// Get all of our event data
var data = require('../data.json');

var newEvent;
var newID;

exports.view = function(req, res){	
	var price = "FREE";
	if(req.query.price != ""){
		price = req.query.price;
	}
	
	newID = req.query.title+req.query.date1+req.query.location;
	
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
			"id": newID
	}
		
	
	var isRepeat = false;
	for(var i = 0; i < data.events.length; i++){
		if(newID == data.events[i].id){
			isRepeat = true;
		}
	}
	
	if(req.query.title != null && !isRepeat){
		data["events"].push(newEvent);
	}
	
	//If making a new user account, push them
	if(req.query.email != null){
		var newUser= {"username": req.query.username,
			"password": req.query.password,
			"linkhref":"login",
			"currentusr":"1",
			"joined_events":[]
		}

		data["logindata"].push(newUser);
	}
	else if(req.query.password != null){
		for(var j = 0; j < data.logindata.length; j++){
			if(data.logindata[j].username == req.query.username && data.logindata[j].password == req.query.password){
				data.logindata[j].currentusr = "1";
			}
		}
	}

	console.log(data);
	res.render('index', data);
};