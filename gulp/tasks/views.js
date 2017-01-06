var gulp = require("gulp");

var manager = require("../manager.js");
var viewsTask = manager.getTask("views");

gulp.task("views", function(){

	gulp
		.src(viewsTask.src)
		.pipe(gulp.dest(viewsTask.dst));

});