var data = require("../data.json");

exports.view = function(req, res){
	console.log("view viewed: " + req.body);

	res.render('view', data);
};