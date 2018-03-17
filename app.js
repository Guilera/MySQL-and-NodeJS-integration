var faker = require('faker');
var mysql = require('mysql');

var connection = mysql.createConnection({
		host: 'localhost',
		user: 'tester',
		database: 'join_us'
});

function getTotalUsers(callback) {
	connection.connect();
	var q = "SELECT COUNT(*) AS total FROM users";
	connection.query(q, function(error, results, fields) {
		if(error) throw error;
		callback(results[0].total);
	}); 
	connection.end();
}

function getAllUsers(callback) {
	connection = mysql.createConnection(connection.config);
	q = "SELECT * FROM users";
	connection.query(q, function(error, results, fields) {
		if(error) throw error;
		callback(results);
	});
	connection.end();
}

function insertBulk() {
	connection = mysql.createConnection(connection.config);
	var data = [];
	for(i = 0 ; i < 500 ; i++)
		data.push([faker.internet.email(), faker.date.past()]);
	var q = "INSERT INTO users VALUES ?";
	connection.query(q, [data], function(error, results) {
		if(error) throw error;		
		console.log(results);
	});
	connection.end();
}

