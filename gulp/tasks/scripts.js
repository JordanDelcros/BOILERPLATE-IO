var gulp = require("gulp");
var gulp_if = require("gulp-if");
var gulp_babel = require("gulp-babel");
var webpack_stream = require("webpack-stream");
var gulp_concat = require("gulp-concat");
var gulp_uglify = require("gulp-uglify");

var manager = require("../manager.js");
var scriptsTask = manager.getTask("scripts");
var errorHandler = require("../components/error-handler.js");

gulp.task("scripts", function(){

	gulp
		.src(scriptsTask.src)
		.pipe(webpack_stream({
			module: {
				loaders: [
					{
						test: /\.js$/,
						exclude: /(node_modules)/,
						loader: "babel-loader",
						query: {
							presets: ["es2015"]
						}
					},
					{
						test: /\.html$/,
						loader: "html"
					},
					{
						test: /\.json$/,
						loader: "json"
					}
				]
			}
		}))
		.on("error", errorHandler)
		.pipe(gulp_concat(scriptsTask.out))
		.pipe(gulp_if(manager.getOption("minify"), gulp_uglify()))
		.pipe(gulp.dest(scriptsTask.dst));

});