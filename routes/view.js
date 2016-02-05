var data = require("../data.json");

exports.view = function(req, res){
	console.log("view viewed");
	res.render('view', data);
};