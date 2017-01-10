var http = require("http");

var server = http.createServer(( request, results )=>{

	console.log(new Date(), request.url);

	results.writeHead(200, {
		"Content-Type": "text/html"
	});

	results.end("<p>Hello World!</p>");

});

server.listen(3000);