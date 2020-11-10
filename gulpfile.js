var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  gUtil = require('gulp-util'),
  del = require('del');

gulp.task('init', gulp.series(function () {
  return del('./dist');
}));

gulp.task('convert', gulp.series(function () {
  return gulp.src('./src/*.js')
    .pipe(babel({
      plugins: ['transform-es2015-modules-umd'],
    }))
    .pipe(uglify().on('error', function (err) {
      gUtil.log(err);
      this.emit('end');
    }))
    .pipe(gulp.dest('./dist'));
}));

gulp.task('public', gulp.series(function () {
  return gulp.src('./dist/UrlHelper.js')
    .pipe(rename(function(path){
      path.basename ='js-url-helper';
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(rename(function(path){
      path.basename ='index';
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./'));
}));

gulp.task('clean', gulp.series(function () {
  return del(['./dist/UrlHelper.js', './src/UrlHelper.js']);
}));

gulp.task('dist', gulp.series('init', 'convert', 'public', 'clean'));