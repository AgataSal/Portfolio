const gulp = require("gulp");
const sass = require("gulp-sass");

sass.compiler = require("sass");


const css = function() {
    return gulp.src("src/scss/style.scss")
        .pipe(
            sass({
                outputStyle : "compressed"
            }).on("error", sass.logError)
        )
        .pipe(gulp.dest("dist/css"));
}


exports.default = gulp.series(css);
exports.css = css;