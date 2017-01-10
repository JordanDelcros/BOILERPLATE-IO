var http = require("http");
var mysql = require("mysql");

var database = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "azerty",
	database: "boilerplate-io"
});

database.connect(function( error ){

	if( error ){

		throw error;

	};

	console.log("Database connected.");

});

database.query(`CREATE TABLE IF NOT EXISTS requests (
	id BIGINT(20) NOT NULL AUTO_INCREMENT,
	path VARCHAR(255) NOT NULL,
	date DATETIME NOT NULL DEFAULT NOW(),
	PRIMARY KEY (id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8`, ( error, rows, field )=>{

	if( error ){

		throw error;

	};

	if( !rows.warningCount ){

		console.log("Created 'requests' table.");

	};

});

var server = http.createServer(( request, results )=>{

	var url = request.url;

	database.query("INSERT INTO requests (path) VALUES (?)", url, function( error ){

		results.writeHead(200, {
			"Content-Type": "text/html"
		});

		if( error ){

			console.error(error);

			results.end("<p>Cannot interact with the database or the 'request' table.</p>");

		}
		else {

			results.end("<p>Database table updated!</p>");

		};

	});

});

server.listen(3000);