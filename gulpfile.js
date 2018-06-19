var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  gutil = require('gulp-util'),
  gulpSequence = require('gulp-sequence'),
  del = require('del');

gulp.task('init', function () {
  return del('./dist');
});

gulp.task('convert', function () {
  return gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify().on('error', function(err){
      gutil.log(err);
      this.emit('end');
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('public', function () {
  return gulp.src('./dist/index.js')
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
});

gulp.task('clean', function () {
  return del('./dist/index.js');
});

gulp.task('dist', gulpSequence('init', 'convert', 'public', 'clean'));