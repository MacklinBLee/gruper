var data = require("../data.json");

exports.view = function(req, res){
	console.log("create viewed");
	res.render('create', data);
};