var gulp = require("gulp");

var manager = require("../manager.js");

gulp.task("minify", function(){

	manager.setOption("minify", true);

});