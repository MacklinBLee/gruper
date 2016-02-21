var data = require("../data.json");

exports.view = function(req, res){
	console.log("login viewed");
	for(var i = 0; i < data.logindata.length; i++){
		data.logindata[i].currentusr = "0";
	}
	console.log(data);
	res.render('login', data);
};