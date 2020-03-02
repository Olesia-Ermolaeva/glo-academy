const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch("./*.html").on('change', browserSync.reload);
});

// Clean CSS
gulp.task('mincss', function() {
  return gulp.src("src/css/*.css")
  .pipe(rename({suffix: ".min"}))
  .pipe(cleanCSS())
  .pipe(gulp.dest("app/css"));
  })