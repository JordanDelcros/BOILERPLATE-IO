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
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		allowNull: false
	}
}, {
	timestamps: false
});

var server = http.createServer(( request, results )=>{

	var url = request.url;

	database
		.sync()
		.then(function(){

			return RequestTable.create({
				path: url
			})
			.then(function( createdRequest ){

				results.end("<p>Database table updated!</p>");

			})
			.catch(function( error ){

				results.end("<p>Cannot interact with the database or the 'request' table.</p>");

				return error;

			});

		})
		.catch(function( error ){

			throw error;

		});

});

server.listen(3000);