var gulp = require("gulp");

gulp.task("build", ["minify", "views", "styles", "images", "scripts"]);