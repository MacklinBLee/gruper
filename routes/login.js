var data = require("../data.json");

exports.view = function(req, res){
	console.log("login viewed");
	res.render('login', data);
};