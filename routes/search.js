var data = require("../data.json");

exports.view = function(req, res){
	console.log("search viewed");
	res.render('search', data);
};