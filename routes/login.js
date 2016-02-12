var data = require("../data.json");

exports.view = function(req, res){
	console.log("login viewed");
	data.logindata[0].username = "Macklin (Logout)";
	data.logindata[0].password = "password";
	data.logindata[0].linkhref = "/";
	res.render('login', data);
};