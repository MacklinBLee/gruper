var data = require("../data.json");

exports.view = function(req, res){
	console.log("logindata");
	console.log(data["logindata"]);
	
	res.json(data["logindata"]);

};