// Get all of our event data
var data = require('../data.json');

exports.view = function(req, res){
	var newEvent= {"title": req.query.title,
			"date1": req.query.date1,
			"hrs1": req.query.hrs1,
			"minute1": req.query.minute1,
			"ampm1": req.query.ampm1,
			"date2": req.query.date2,
			"hrs2": req.query.hrs2,
			"minute2": req.query.minute2,
			"ampm2": req.query.ampm2,
			"price": req.query.price,
			"location": req.query.location,
			"description": req.query.description,
			"capacity": req.query.capacity
	}
	if(req.query.title != null){
		data["events"].push(newEvent);
	}
	
	console.log(data);
	res.render('index', data);
};