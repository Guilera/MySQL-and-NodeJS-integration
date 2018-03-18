var faker = require('faker');
var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
		host: 'localhost',
		user: 'tester',
		database: 'join_us'
});


app.get("/", function(req, res){
	getCountUsers(x => res.render("home", {count: x}));
});

app.post("/register", function(req, res){
	var user = {email: req.body.email};
	insertUser(user, () => res.redirect("/"));
});

app.listen(8080, console.log("app listening on port 8080"));

function getCountUsers(callback) {
	connection = mysql.createConnection(connection.config);
	var q = "SELECT COUNT(*) AS total FROM users";
	connection.query(q, function(error, results, fields) {
		if(error) throw error;
		callback(results[0].total);
	}); 
	connection.end();
}

function insertUser(data, callback) {
	connection = mysql.createConnection(connection.config);
	var q = "INSERT INTO users SET ?";
	connection.query(q, data, function(error, results){
		console.log(error);
		console.log(results);
		callback();
	});
}