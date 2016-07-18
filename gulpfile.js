var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    less = require("gulp-less"),
    cssmin = require("gulp-cssmin"),
    rename = require("gulp-rename");

var paths = {
    excludes: "!./**/*.min.*",
    venCopySrc: "./bower_components/",
    venCopyDest: "./src/",
    depSrc: "./src/pn-bootstrap-utilities.less",
    depDest: "./dist",
    concatDest: "./dist/pn-bootstrap-utilities.css",
    minSrc: "./dist/**/*.*",
    
};

// clean

gulp.task("clean", function (cb) {
    rimraf(paths.depDest, cb);
});

// deploy

gulp.task("deploy", ["clean"], function () {
    return gulp.src(paths.depSrc)
        .pipe(less({ relativeUrls: true }))
        .pipe(concat(paths.concatDest))
        .pipe(gulp.dest("."));
});

// min

gulp.task("min", ["deploy"], function () {
    return gulp.src([paths.minSrc, paths.excludes])
        .pipe(cssmin())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest(paths.depDest));
});

gulp.task("default", ["min"]);

// vendors copy

gulp.task("vendors-copy:bootstrap", function () {
    return gulp.src(paths.venCopySrc + "bootstrap/less/variables.less")
        .pipe(gulp.dest(paths.venCopyDest + "bootstrap"));
});
