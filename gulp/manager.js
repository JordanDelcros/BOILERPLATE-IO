var TaskManager = require("./components/TaskManager.js");
var Task = require("./components/Task.js");

var src = "source/";
var dst = "build/";

module.exports = new TaskManager([
	new Task("views", {
		src: src + "views/**/*.html",
		dst: dst,
		rld: ["views", "scripts"]
	}),
	new Task("styles", {
		src: src + "styles/*.scss",
		dst: dst + "assets/styles/",
		out: "app.css",
		wth: src + "styles/**/*.scss"
	}),
	new Task("scripts", {
		src: src + "scripts/*.js",
		dst: dst + "assets/scripts/",
		out: "app.js",
		wth: src + "scripts/**/*.js"
	}),
	new Task("shaders", {
		src: src + "shaders/*.glsl",
		dst: dst + "/assets/shaders",
		wth: src + "shaders/*.glsl",
		rld: ["scripts"]
	}),
	new Task("images", {
		src: src + "images/**/*.+(jpg|gif|png|svg)",
		dst: dst + "assets/images"
	})
], {
	base: dst,
	minify: false
});