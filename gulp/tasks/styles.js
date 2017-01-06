var gulp = require("gulp");
var gulp_if = require("gulp-if");
var gulp_sass = require("gulp-sass");
var gulp_concat = require("gulp-concat");
var gulp_autoprefixer = require("gulp-autoprefixer");
var gulp_clean_css = require("gulp-clean-css");

var manager = require("../manager.js");
var stylesTask = manager.getTask("styles");
var errorHandler = require("../components/error-handler.js");

gulp.task("styles", function(){

	gulp
		.src(stylesTask.src)
		.pipe(gulp_sass())
		.on("error", errorHandler)
		.pipe(gulp_concat(stylesTask.out))
		.pipe(gulp_autoprefixer({
			browsers: ["> 0%", "last 5 versions", "IE 10"]
		}))
		.pipe(gulp_if(manager.getOption("minify"), gulp_clean_css({
			compatibility: "ie10"
		})))
		.pipe(gulp.dest(stylesTask.dst));

});
