var data = require("../data.json");

exports.view = function(req, res){
	console.log("view viewed: " + req.body.user);
	console.log("view viewed: " + req.body.id);
	
	for(var i = 0; i < data.logindata.length; i++){
		if(req.body.user == data.logindata[i].username){
			data.logindata[i].joined_events.push({'id':req.body.id});
		}
	}

	res.render('view', data);
};