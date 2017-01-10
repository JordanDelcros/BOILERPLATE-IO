var http = require("http");
var Sequelize = require("sequelize");

var database = new Sequelize("boilerplate-io", "root", "azerty", {
	host: "localhost",
	dialect: "mysql"
});

database
	.authenticate()
	.then(function(){

		console.log("Connected to the database");

	})
	.catch(function( error ){

		throw error;

	});

var RequestTable = database.define("request", {
	path: Sequelize.STRING,
	date: Sequelize.DATE
}, {
	timestamps: false
});

var server = http.createServer(( request, results )=>{

	var url = request.url;

	database
		.sync()
		.then(function(){

			results.end("<p>Database table updated!</p>");

			return RequestTable.create({
				path: url,
				date: new Date()
			});

		})
		.catch(function( error ){

			console.error(error);

			results.end("<p>Cannot interact with the database or the 'request' table.</p>");

		});

});

server.listen(3000);