var gulp = require("gulp");
var Task = require("../components/Task.js");
var browser_sync = require("browser-sync").create();
var modRewrite = require('connect-modrewrite');

var manager = require("../manager.js");

gulp.task("stream", function(){

	browser_sync.init({
		server: {
			baseDir: manager.getOption("base"),
			middleware: [
				modRewrite([
					"^[^\\.]*$ /index.html [L]"
				])
			],
			open: false
		}
	});

	manager.each(( task )=>{

		gulp.watch((task.wth || task.src), task.rld);

	});

});
