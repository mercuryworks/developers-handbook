var gulp = require("gulp");
var shell = require("gulp-shell");
var browserSync = require("browser-sync").create();

// Task for building blog when something changed:
//gulp.task('build', shell.task(['bundle exec jekyll serve']));
// If you don't use bundle:
// gulp.task('build', shell.task(['jekyll serve']));
// If you use  Windows Subsystem for Linux (thanks @SamuliAlajarvela):
gulp.task("build", shell.task(["bundle exec jekyll serve --force_polling"]));

// Task for serving blog with Browsersync
gulp.task("serve", function() {
    browserSync.init({
        host: "127.0.0.1",
        open: 'external',
        port: 4000,
        proxy: "127.0.0.1:4000/developers-handbook/",
        // server: {
        //     baseDir: "_site/"
        // },
    });
    gulp.watch("_site/**/*.*").on("change", browserSync.reload);
});
gulp.task("watch", ["build", "serve"]);
gulp.task("default", ["watch"]);
