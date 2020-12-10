var gulp = require('gulp');
var uglify = require('gulp-uglify');
let uglifyES = require('gulp-uglify-es').default;
var rename = require('gulp-rename');
var babel = require('gulp-babel');
var gUtil = require('gulp-util');
var del = require('del');
var replace = require('gulp-replace');

gulp.task('init', gulp.series(function () {
  gulp.src('./index.js')
    .pipe(gulp.dest('./dist'));
  return gulp.src('./index.js')
    .pipe(uglifyES().on('error', function (err) {
      gUtil.log(err);
      this.emit('end');
    }))
    .pipe(gulp.dest('./'));
}));

gulp.task('convert', gulp.series(function () {
  return gulp.src('./dist/index.js')
    .pipe(rename(function (path) {
      path.basename = 'UrlHelper';
      path.extname = ".js";
    }))
    .pipe(babel({
      plugins: ['transform-es2015-modules-umd'],
    }))
    .pipe(replace('global.UrlHelper = mod.exports;', 'global.UrlHelper = mod.exports.default;'))
    .pipe(rename(function (path) {
      path.basename = 'js-url-helper';
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(rename(function (path) {
      path.basename = 'js-url-helper.min';
      path.extname = ".js";
    }))
    .pipe(gulp.dest('./dist'));
}));

gulp.task('uglify', gulp.series(function () {
  return gulp.src('./dist/js-url-helper.min.js')
    .pipe(uglify().on('error', function (err) {
      gUtil.log(err);
      this.emit('end');
    }))
    .pipe(gulp.dest('./dist'));
}));

gulp.task('clean', gulp.series(function () {
  return del(['./src/index.js', './dist/index.js']);
}));

gulp.task('dist', gulp.series('init', 'convert', 'uglify', 'clean'));