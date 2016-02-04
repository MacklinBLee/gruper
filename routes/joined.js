var data = require("../data.json");

exports.view = function(req, res){
	console.log("joined viewed");
	res.render('joined', data);
};