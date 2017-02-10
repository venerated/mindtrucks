'use strict';

var gulp = require('gulp'),
    newer = require('gulp-newer'),
    imagemin = require('gulp-imagemin'),
    htmlclean = require('gulp-htmlclean'),
    sass = require('gulp-sass'),
    folder = {
      src: 'src/',
      build: 'build/'
    };

gulp.task('images', function() {
  var out = folder.build + 'images/';
  return gulp.src(folder.src + 'images/**/*')
    .pipe(newer(out))
    .pipe(imagemin(
      {optimizationLevel: 5}
      ))
    .pipe(gulp.dest(out));
});

gulp.task('html', ['images'], function() {
  var out = folder.build,
      page = gulp.src(folder.src + 'html/**/*')
      .pipe(newer(out));
      page = page.pipe(htmlclean());
  return page.pipe(gulp.dest(out));
});

gulp.task('sass', function() {
  return gulp.src(folder.src + 'scss/style.scss')
    .pipe(sass({
      outputStyle: 'compressed',
      errLogToConsole: true
    }))
    .pipe(gulp.dest(folder.build + 'css/'));

});

gulp.task ('default', ['html', 'sass']);

gulp.task('watch', function() {
  gulp.watch(folder.src + 'images/**/*', ['images']);
  gulp.watch(folder.src + 'html/**/*', ['html']);
  gulp.watch(folder.src + 'scss/**/*', ['sass']);
});