var data = require("../data.json");

exports.view = function(req, res){
	console.log(data);
	console.log("joined viewed");
	var users = data["logindata"];
	var curr;
	for(var i = 0; i < users.length; i++){
		// if current user then assign to curr
		if(users[i].currentusr == "1")
			curr = users[i];
	}
	console.log(curr);
	res.render('joined', curr);
};