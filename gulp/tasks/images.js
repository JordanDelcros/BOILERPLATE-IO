var gulp = require("gulp");

var manager = require("../manager.js");
var imagesTask = manager.getTask("images");

gulp.task("images", function(){

	gulp
		.src(imagesTask.src)
		.pipe(gulp.dest(imagesTask.dst));

});