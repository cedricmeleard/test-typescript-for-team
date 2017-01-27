'use strict';
 
var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function() {
    var tsResult = gulp.src("app/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
 
    return tsResult.js.
        pipe(sourcemaps.write()).
        pipe(gulp.dest('built'));
});
gulp.task('scripts:watch', () => {
  gulp.watch('./app/**/*.ts', ['scripts']);
});

gulp.task('sass', () => {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'));
});
 
gulp.task('sass:watch', () => {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts','sass'], () => {
    console.log('code compiled');
});
gulp.task(':watch', ['scripts:watch','sass:watch'], () => {
    console.log('started watching');
});