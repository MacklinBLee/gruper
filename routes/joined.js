var data = require("../data.json");

exports.view = function(req, res){
	console.log("joined viewed");
	// ID of the event to unjoin
	var event_id = req.body.id;
	// ID of the event to delete
	var event_id_del = req.body.del_id
	console.log(event_id);
	console.log(event_id_del);

	var users = data["logindata"];
	var curr;

	// Go through ever user except guest
	for(var i = 1; i < users.length; i++){
		// if current user then assign to curr
		curr = users[i];
		// only unjoin for user currently logged in
		if(curr.currentusr == "1"){ 
			for(var j = 0; j < curr.joined_events.length; j++){
				// remove id from JSON array for unjoin
				if(event_id == curr.joined_events[j].id){
					curr.joined_events.splice(j, 1);
					console.log("UNJOINED: " + j );
				}
			}
		}

		// remove id from JSON array for delete
		for(var j = 0; j < curr.joined_events.length; j++){
				// remove id from JSON array for unjoin
				if (event_id_del == curr.joined_events[j].id) {
					console.log("event_id:" + event_id_del);
					console.log("check with: " + curr.joined_events[j].id);
					console.log("DELETE ");
					curr.joined_events.splice(j, 1);
				}
		}
	}

	for(var i = 0; i < data["events"].length; i++){
		// remove event entirely from JSON array events and then look through each user and delete the ones that have joined this event
		if(event_id_del == data["events"][i].id){
			console.log(event_id_del);
			console.log(data["events"].id);
			data["events"].splice(i, 1);
		}
	}
	
	console.log(curr);
	res.render('joined', curr);
};