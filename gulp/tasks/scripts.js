var gulp = require("gulp");
var gulp_if = require("gulp-if");
var gulp_babel = require("gulp-babel");
var webpack_stream = require("webpack-stream");
var gulp_concat = require("gulp-concat");
var gulp_uglify = require("gulp-uglify");

var manager = require("../manager.js");
var scriptsTask = manager.getTask("scripts");

gulp.task("scripts", function(){

	gulp
		.src(scriptsTask.src)
		.pipe(webpack_stream({
			resolve: {
				alias: {
					vue: "vue/dist/vue.js"
				}
			},
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
						test: /\.glsl$/,
						loader: "shader"
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
		.pipe(gulp_concat(scriptsTask.out))
		.pipe(gulp_if(manager.getOption("minify"), gulp_uglify()))
		.pipe(gulp.dest(scriptsTask.dst));

});