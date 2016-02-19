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
	
	console.log(data);
	res.render('index', data);
};