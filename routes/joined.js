var data = require("../data.json");

exports.view = function(req, res){
	console.log("joined viewed");
	// ID of the event to unjoin
	var event_id = req.body.id;
	console.log(event_id);

	var users = data["logindata"];
	var curr;
	for(var i = 0; i < users.length; i++){
		// if current user then assign to curr
		if(users[i].currentusr == "1"){ 
			curr = users[i];
			for(var j = 0; j < curr.joined_events.length; j++){
				if(event_id == curr.joined_events[j].id)
					curr.joined_events.splice(j, 1);
			}
		}
	}
	
	console.log("unjoin from: " + req.body.id);
	console.log(curr);
	res.render('joined', curr);
};